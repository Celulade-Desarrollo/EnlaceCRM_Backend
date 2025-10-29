import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export class UbicacionesAdapter {
  static async extraerDireccionesDesdePDF() {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const pdfPath = path.join(__dirname, "../../data/ubicaciones.pdf");

      if (!fs.existsSync(pdfPath)) {
        throw new Error("El archivo PDF no existe en data/");
      }

      const data = new Uint8Array(fs.readFileSync(pdfPath));
      const pdf = await pdfjsLib.getDocument({ data }).promise;

      let textoCompleto = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const texto = content.items.map((item) => item.str).join(" ");
        textoCompleto += " " + texto;
      }
      textoCompleto = textoCompleto
        .replace(/\s+/g, " ")
        .replace(/C ó digo/g, "Código")
        .replace(/Direcci ó n/g, "Dirección")
        .replace(/ANTIOQUIA /g, "ANTIOQUIA ")
        .trim();

      const bloques = textoCompleto.split(/\s0\d{5}\s/).slice(1);

      const ubicaciones = bloques.map((bloque, index) => {
        const matchDireccion = bloque.match(/MEDELLIN\s+([A-Z0-9#\-\.\s]+)/i);
        const direccion = matchDireccion ? matchDireccion[1].trim() : "No encontrada";

        return {
          id: index + 1,
          nombre: "SERVIENTREGA",
          municipio: "MEDELLIN",
          departamento: "ANTIOQUIA",
          direccion,
        };
      });

      console.log("✅ Ubicaciones procesadas:", ubicaciones.slice(0, 3));
      return ubicaciones;
    } catch (error) {
      console.error("Error al procesar PDF:", error);
      throw error;
    }
  }
}