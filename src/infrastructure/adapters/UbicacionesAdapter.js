import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

export class UbicacionesAdapter {
  static async extraerDireccionesDesdePDF() {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const pdfPath = path.join(__dirname, "../../../data/ubicaciones.pdf");

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

      const direcciones = textoCompleto
        .split(/\n|\r/)
        .map((l) => l.trim())
        .filter((l) => l && l.length > 5);

      console.log("📍 Direcciones extraídas:", direcciones.slice(0, 10));

      return direcciones;
    } catch (error) {
      console.error("Error al procesar PDF:", error);
      throw error;
    }
  }
}
