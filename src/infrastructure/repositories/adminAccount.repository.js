import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const adminAccountRepository = {
    async obtenerTodos() {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Admin");
        return result.recordset;
    },
    async validarCuentaCedula(cedula){
        const pool = await poolPromise;
        // Verificar si es un usuario final
        const usuario = await pool
          .request()
          .input("Cedula_Admin", sql.NVarChar, cedula)
          .query(`SELECT * FROM Admin WHERE Cedula_Admin = @Cedula_Admin`);
          return usuario.recordset[0]
    },

    async crearCuentaAdmin(input){
        const pool = await poolPromise;
            const result = await pool.request()
            .input("Numero_Admin", sql.NVarChar, input.Numero_Admin)
            .input("Nombre_Admin", sql.NVarChar, input.Nombre_Admin)
            .input("Empresa_Admin", sql.NVarChar, input.Empresa_Admin)
            .input("Cedula_Admin", sql.NVarChar, input.Cedula_Admin)
            .input("Contrasena", sql.NVarChar, input.Contrasena)
            .query(`INSERT INTO Admin (Numero_Admin, Nombre_Admin, Empresa_Admin, Cedula_Admin, Contrasena) VALUES (@Numero_Admin, @Nombre_Admin, @Empresa_Admin, @Cedula_Admin, @Contrasena)`);
        return result.recordset
    },

    async actualizarContrasena(id, nuevaContrasena){
        const pool = await poolPromise;
        const result = await pool.request()
        .input("Id", sql.Int, id)
        .input("Contrasena", sql.NVarChar, nuevaContrasena)
        .query(`UPDATE Admin SET Contrasena = @Contrasena WHERE Id = @Id`);
        return result.recordset
    }
}

