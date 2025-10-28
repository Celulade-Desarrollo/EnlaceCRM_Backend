import fs from "fs";
import path from "path";

const DATA_PATH = path.resolve("data", "ubicaciones.json");

export const ubicacionesRepository = {
  async guardarUbicaciones(ubicaciones) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(ubicaciones, null, 2));
    return { mensaje: "Ubicaciones guardadas correctamente" };
  },
  
  async obtenerUbicaciones() {
    if (!fs.existsSync(DATA_PATH)) return [];
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },
};