import UbicacionRepository from "../../domain/ports/UbicacionRepository.js";
   import { poolPromise } from "../persistence/database.js";
 
export default class SQLServerUbicacionRepository extends UbicacionRepository {
  async getDepartamentos() {
    const pool = await poolPromise;
    const result = await pool.request()
      .query("SELECT id, nombre FROM ubicaciones WHERE nivelId = 2");
    return result.recordset;
  }
 
  async getCiudadesByDepartamento(idDepartamento) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("parentid", idDepartamento)
      .query("SELECT id, nombre FROM ubicaciones WHERE nivelId = 6 AND parentId = @parentid");
    return result.recordset;
  }
 
  async getBarriosByCiudad(idCiudad) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("parentid", idCiudad)
      .query("SELECT id, nombre FROM ubicaciones WHERE nivelId = 7 AND parentId = @parentid");
    return result.recordset;
  }
}
 
 