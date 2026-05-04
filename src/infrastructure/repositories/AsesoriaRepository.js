// src/infrastructure/repositories/AsesoriaRepository.js
import { poolPromise } from "../persistence/database.js";

class AsesoriaRepository {
  async getPendientes() {
    try {
      const pool = await poolPromise;
const query = `
  SELECT
    nbCliente, 
    nbAgenteComercial,
    Estado
  FROM FlujosRegistroEnlace 
  WHERE Estado = 'Asesor'
`;
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      console.error("Error en DB:", error);
      throw error;
    }
  }
}

export default new AsesoriaRepository();