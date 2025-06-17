import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const bancowRepository = {
    async obtenerTodos() {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM FlujosRegistroBancoW");
        return result.recordset;
    },

    async obtenerPorIdFlujoRegistro(idFlujoRegistro) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
            .query("SELECT * FROM FlujosRegistroBancoW WHERE IdFlujoRegistro = @IdFlujoRegistro");
        return result.recordset[0];
    },

    async verificarDuplicados(idFlujoRegistro) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
            .query("SELECT IdBancoW FROM FlujosRegistroBancoW WHERE IdFlujoRegistro = @IdFlujoRegistro");
        return result.recordset.length > 0;
    },

    async crearRegistro(input) {
   
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, input.IdFlujoRegistro)
            .input("Validacion_Banco_listas", sql.NVarChar, input.Validacion_Banco_listas)
            .input("Aprobacion_Cupo_sugerido", sql.NVarChar, input.Aprobacion_Cupo_sugerido)
            .input("Pagare_Digital_Firmado", sql.NVarChar, input.Pagare_Digital_Firmado)
            .input("Creacion_Core_Bancario", sql.NVarChar, input.Creacion_Core_Bancario)
            .input("UsuarioAprobado", sql.NVarChar, input.UsuarioAprobado)
            .query(`
        INSERT INTO FlujosRegistroBancoW (
          IdFlujoRegistro, Validacion_Banco_listas, Aprobacion_Cupo_sugerido,
          Pagare_Digital_Firmado, Creacion_Core_Bancario, UsuarioAprobado
        ) VALUES (
          @IdFlujoRegistro, @Validacion_Banco_listas, @Aprobacion_Cupo_sugerido,
          @Pagare_Digital_Firmado, @Creacion_Core_Bancario, @UsuarioAprobado
        );
        SELECT SCOPE_IDENTITY() AS insertedId;
      `)
        return result.recordset[0].insertedId;
    },


    
    async eliminarPorIdFlujoRegistro(idFlujoRegistro) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
            .query("DELETE FROM FlujosRegistroBancoW WHERE IdFlujoRegistro = @IdFlujoRegistro");
        return result.rowsAffected[0];
    },


    async obtenerUsuarioFinalPorIdFlujo(idFlujoRegistro) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
            .query("SELECT * FROM UsuarioFinal WHERE IdFlujoRegistro = @IdFlujoRegistro");
        return result.recordset[0];
    },

    async actualizarCoreBancario(idFlujoRegistro, input) {
        const pool = await poolPromise;
        const { Pagare_Digital_Firmado, Creacion_Core_Bancario, UsuarioAprobado } = input;

        await pool.request()
            .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
            .input("Pagare_Digital_Firmado", sql.NVarChar, Pagare_Digital_Firmado)
            .input("Creacion_Core_Bancario", sql.NVarChar, Creacion_Core_Bancario)
            .input("UsuarioAprobado", sql.NVarChar, UsuarioAprobado)
            .query(`
                UPDATE FlujosRegistroBancoW 
                SET Pagare_Digital_Firmado = @Pagare_Digital_Firmado,
                    Creacion_Core_Bancario = @Creacion_Core_Bancario,
                    UsuarioAprobado = @UsuarioAprobado
                WHERE IdFlujoRegistro = @IdFlujoRegistro
            `);
    }
};

