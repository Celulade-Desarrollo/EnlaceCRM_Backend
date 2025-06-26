// src/domain/repositories/AdminRepository.js
import { poolPromise, sql } from '../../infrastructure/persistence/database.js'; // Asegúrate que database.js exporta ambos.

export class AdminRepository {
  constructor() {
    this.pool = poolPromise; // poolPromise es la conexión a tu base de datos MSSQL.
  }

  /**
   * Busca un administrador por su cédula en la base de datos.
   * @param {string} cedula La cédula del administrador a buscar.
   * @returns {Promise<object | null>} Los datos del administrador (incluyendo Contrasena, Nombre, Roles), o null si no se encuentra.
   */
  async findByCedula(cedula) {
    try {
      const pool = await this.pool;
      const result = await pool
        .request()
        .input("Cedula_Admin", sql.NVarChar, cedula)
        .query(`SELECT id, Cedula_Admin, Contrasena, Nombre_Admin, FROM Admin WHERE Cedula_Admin = @Cedula_Admin`);
      
      if (result.recordset.length > 0) {
        return result.recordset[0];
      }
      return null;
    } catch (error) {
      console.error("AdminRepository - Error al buscar admin por cédula:", error);
      throw new Error("Error en la base de datos al buscar administrador."); // Lanza un error para ser capturado por el caso de uso/controlador.
    }
  }
}

// Exportamos una instancia para que pueda ser usada como dependencia en los casos de uso.
export const adminRepository = new AdminRepository();