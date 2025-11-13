import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFUbicacionRepository from "../../infrastructure/repositories/PDFUbicacionRepository.js";
import fetch from "node-fetch";

const LOCATIONIQ_KEY = "pk.07efd9bdd6f7b30203c5b47a81901f77"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function limpiarDireccion(direccion) {
  return direccion
    .replace(/BAJ.*$/i, "")
    .replace(/Jornada.*$/i, "")
    .replace(/L\s*-\s*V\s*\d+/i, "")
    .replace(/[#.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

class UbicacionMapaService {
  constructor(repository) {
    this.repository = repository;
  }

  // ✅ Procesa PDF → genera JSON con coordenadas
  async procesarUbicacionesDesdePDF() {
    const ubicaciones = await this.repository.procesarUbicacionesDesdePDF();

    const resultados = [];
    let contador = 1;

    for (const ubicacion of ubicaciones) {
      const direccionLimpia = limpiarDireccion(`${ubicacion.direccion}, ${ubicacion.municipio}, ${ubicacion.departamento}, Colombia`);
      const url = `https://us1.locationiq.com/v1/search?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(direccionLimpia)}&format=json`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const { lat, lon } = data[0];
          console.log(`✅ [${contador}/${ubicaciones.length}] ${direccionLimpia}`);
          resultados.push({ ...ubicacion, lat, lon });
        } else {
          console.warn(`⚠️ No se encontró: ${direccionLimpia}`);
          resultados.push({ ...ubicacion, lat: null, lon: null });
        }
      } catch (error) {
        console.error(`❌ Error con ${direccionLimpia}: ${error.message}`);
        resultados.push({ ...ubicacion, lat: null, lon: null });
      }

      contador++;
      await new Promise(r => setTimeout(r, 1000)); // ⏳ respeta límite de 1 req/seg
    }

    const dataPath = path.join(__dirname, "../../data/ubicaciones.json");
    fs.writeFileSync(dataPath, JSON.stringify(resultados, null, 2), "utf-8");
    console.log(`✅ Archivo JSON generado con ${resultados.length} ubicaciones`);
    return resultados;
  }

  async obtenerUbicaciones() {
    const dataPath = path.join(__dirname, "../../data/ubicaciones.json");
    if (!fs.existsSync(dataPath)) {
      throw new Error("El archivo ubicaciones.json no existe. Ejecuta primero /api/mapa/procesar");
    }
    const rawData = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(rawData);
  }
}

const repository = new PDFUbicacionRepository();
const ubicacionMapaService = new UbicacionMapaService(repository);
export default ubicacionMapaService;