import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export class UbicacionesAdapter {
  static async extraerUbicacionesDesdePDF() {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const pdfPath = path.join(__dirname, "../../data/ubicaciones-1-498.pdf");

      if (!fs.existsSync(pdfPath)) {
        throw new Error("❌ No se encontró el archivo PDF en data/");
      }

      // Leer PDF
      const data = new Uint8Array(fs.readFileSync(pdfPath));
      const pdf = await pdfjsLib.getDocument({ data }).promise;

      let textoCompleto = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const texto = content.items.map((item) => item.str).join(" ");
        textoCompleto += " " + texto;
      }

      // Limpiar texto básico
      textoCompleto = textoCompleto
        .replace(/\s+/g, " ")
        .replace(/[^\wÁÉÍÓÚáéíóúÑñ#\-\.,]/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();

      // Extraer bloques por palabra clave (ej. ANTIOQUIA MEDELLIN)
      const bloques = textoCompleto.split(/ANTIOQUIA\s+MEDELLIN/i).slice(1);

      const ubicaciones = bloques.map((bloque, index) => {
        // Buscar dirección con regex que contenga números y guiones (formato típico de calles)
        const matchDireccion = bloque.match(
          /(CALLE|CARRERA|CRA|CR\.?|CLL|AVENIDA|TRANSVERSAL|DIAGONAL|KR|CL)\s*[A-Z0-9#\-\s\.]+?\d+\s*[-#]\s*\d+[A-Z0-9\-]*/i
        );

        const direccion = matchDireccion ? matchDireccion[0].trim() : "No encontrada";

        // Buscar horario
        const matchHorario = bloque.match(/(Jornada\s+Continua\s+[A-Z\s\-0-9:]+)/i);
        const horario = matchHorario ? matchHorario[1].trim() : "No especificado";

        return {
          id: index + 1,
          departamento: "ANTIOQUIA",
          municipio: "MEDELLIN",
          direccion,
          horarioSemana: horario,
        };
      });

      // Guardar JSON limpio
      const dataDir = path.join(__dirname, "../../../data");
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
      const jsonPath = path.join(dataDir, "ubicaciones.json");
      fs.writeFileSync(jsonPath, JSON.stringify(ubicaciones, null, 2), "utf-8");

      console.log(`✅ Procesadas ${ubicaciones.length} ubicaciones (PDF limpio)`);
      console.log("Ejemplo:", ubicaciones.slice(0, 3));

      return ubicaciones;
    } catch (error) {
      console.error("❌ Error procesando el PDF:", error);
      throw error;
    }
  }
}