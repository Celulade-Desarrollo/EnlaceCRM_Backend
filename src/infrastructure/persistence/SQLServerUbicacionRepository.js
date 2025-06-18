import { poolPromise } from "./database.js";

export default class SQLServerUbicacionRepository {
  async getDepartamentos() {
    console.log("🏷️ Query Departamentos: nivelId = 2");
    const pool = await poolPromise;
    const result = await pool.request()
      .query("SELECT id, nombre FROM ubicaciones WHERE nivelId = 2");
    console.log("📦 Departamentos:", result.recordset);
    return result.recordset;
  }

  async getCiudadesByDepartamento(idDepartamento) {
    console.log("🏷️ Query Ciudades: nivelId = 6, parentId =", idDepartamento);
    const pool = await poolPromise;
    const result = await pool.request()
      .input("parentid", idDepartamento)
      .query("SELECT id, nombre FROM ubicaciones WHERE nivelId = 6 AND parentId = @parentid");
    console.log("📦 Ciudades:", result.recordset);
    return result.recordset;
  }

  async getBarriosByCiudad(idCiudad) {
    console.log("🏷️ Query Barrios: nivelId = 7, parentId =", idCiudad);
    const pool = await poolPromise;
    const result = await pool.request()
      .input("parentid", idCiudad)
      .query("SELECT id, nombre FROM ubicaciones WHERE nivelId = 7 AND parentId = @parentid");
    console.log("📦 Barrios:", result.recordset);
    return result.recordset;
  }
}
