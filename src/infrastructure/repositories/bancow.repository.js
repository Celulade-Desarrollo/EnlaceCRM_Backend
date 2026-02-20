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
            .input("Pagare_Digital_Enviado", sql.NVarChar, input.Pagare_Digital_Enviado)
            .input("UsuarioAprobado", sql.NVarChar, input.UsuarioAprobado)
            .query(`
        INSERT INTO FlujosRegistroBancoW (
          IdFlujoRegistro, Validacion_Banco_listas, Aprobacion_Cupo_sugerido,
          Pagare_Digital_Firmado, Pagare_Digital_Enviado, UsuarioAprobado
        ) VALUES (
          @IdFlujoRegistro, @Validacion_Banco_listas, @Aprobacion_Cupo_sugerido,
          @Pagare_Digital_Firmado, @Pagare_Digital_Enviado, @UsuarioAprobado
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
        const { Pagare_Digital_Firmado, Pagare_Digital_Enviado, UsuarioAprobado } = input;

        await pool.request()
            .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
            .input("Pagare_Digital_Firmado", sql.NVarChar, Pagare_Digital_Firmado)
            .input("Pagare_Digital_Enviado", sql.NVarChar, Pagare_Digital_Enviado)
            .input("UsuarioAprobado", sql.NVarChar, UsuarioAprobado)
            .query(`
                UPDATE FlujosRegistroBancoW 
                SET Pagare_Digital_Firmado = @Pagare_Digital_Firmado,
                    Pagare_Digital_Enviado = @Pagare_Digital_Enviado,
                    UsuarioAprobado = @UsuarioAprobado
                WHERE IdFlujoRegistro = @IdFlujoRegistro
            `);
    },

    async obtenerDatosExcel(){
        const pool = await poolPromise;
        const result = await pool.request().query(`
           SELECT 
            fre.*,
            fres.Estado AS Estado_Scoring,
            fres.Scoring,
            fres.Cliente_Acepto,
            fres.Latitud,
            fres.Longitud,
            fre.Nombre_Tienda,
            frb.Aprobacion_Cupo_sugerido,
            frb.Pagare_Digital_Firmado,
            frb.Pagare_Digital_Enviado,
            frb.UsuarioAprobado
        FROM FlujosRegistroEnlace fre
        LEFT JOIN FlujosRegistroEnlaceScoring fres
            ON fre.Id = fres.IdFlujoRegistro
        LEFT JOIN FlujosRegistroBancoW frb
            ON fre.Id = frb.IdFlujoRegistro
        `);
        return result.recordset;
    }

};