// src/domain/repositories/UserRepository.js
import { poolPromise, sql } from '../../infrastructure/persistence/database.js';

export class UserRepository {
  constructor() {
    this.pool = poolPromise;
  }

  /**
   * Busca un UsuarioFinal por su cédula en la base de datos.
   * @param {string} cedula - La cédula del usuario a buscar.
   * @returns {Promise<object | null>} Los datos del UsuarioFinal, o null si no se encuentra.
   */
  async findByCedula(cedula) {
    try {
      const pool = await this.pool;
      const result = await pool
        .request()
        .input("Cedula_Usuario", sql.NVarChar, cedula)
        .query(`SELECT IdUsuarioFinal, Cedula_Usuario, Numero_Cliente, FROM UsuarioFinal WHERE Cedula_Usuario = @Cedula_Usuario`); // Asegúrate que 'Roles' es el nombre correcto en tu tabla UsuarioFinal

      if (result.recordset.length > 0) {
        return result.recordset[0];
      }
      return null;
    } catch (error) {
      console.error("UserRepository - Error al buscar usuario por cédula:", error);
      throw new Error("Error en la base de datos al buscar usuario.");
    }
  }
}

// Exportamos una instancia para que pueda ser usada como dependencia en los casos de uso.
export const userRepository = new UserRepository();