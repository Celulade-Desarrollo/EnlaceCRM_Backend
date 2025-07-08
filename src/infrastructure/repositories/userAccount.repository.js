    import { poolPromise } from "../persistence/database.js";
    import sql from "mssql";

export const userAccountRepository = {
    async obtenerTodos() {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM UsuarioFinal");
        return result.recordset;
    },

    async obtenerPorIdFlujoRegistro(idFlujoRegistro) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
            .query("SELECT * FROM UsuarioFinal WHERE IdFlujoRegistro = @IdFlujoRegistro");
        return result.recordset[0];
    },

    async verificarDuplicados(idFlujoRegistro) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
            .query("SELECT IdUsuarioFinal FROM UsuarioFinal WHERE IdFlujoRegistro = @IdFlujoRegistro");
        return result.recordset.length > 0;
    },

    async crearRegistro(input) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, input.IdFlujoRegistro)
            .input("Numero_Cliente", sql.NVarChar, input.Numero_Cliente)
            .input("CupoFinal", sql.NVarChar, input.CupoFinal)
            .input("Contrasena", sql.NVarChar, input.Contrasena || null)
            .query(`
                INSERT INTO UsuarioFinal (
                    IdFlujoRegistro, Numero_Cliente, CupoFinal, Contrasena
                ) VALUES (
                    @IdFlujoRegistro, @Numero_Cliente, @CupoFinal, @Contrasena
                );
                SELECT SCOPE_IDENTITY() AS insertedId;
            `);
        return result.recordset[0].insertedId;
    },

    async eliminarPorIdFlujoRegistro(idFlujoRegistro) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
            .query("DELETE FROM UsuarioFinal WHERE IdFlujoRegistro = @IdFlujoRegistro");
        return result.rowsAffected[0];
    },

    async actualizarContrsasena(numero, password) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("Numero_Cliente", sql.NVarChar, numero)
            .input("Contrasena", sql.NVarChar, password)
            .query(`
                UPDATE UsuarioFinal 
                SET Contrasena = @Contrasena
                WHERE Numero_Cliente = @Numero_Cliente
            `);
        return result.rowsAffected[0];
    },

    async  traerSaldo(idUsuario) {
        try {
            const pool = await poolPromise; 
            const result = await pool.request()
                .input("idUsuario", sql.Int, idUsuario)
                .query(`
                    SELECT 
                        u.IdUsuarioFinal,
                        u.CupoFinal,
                        u.CupoDisponible,
                        m.FechaPagoProgramado,
                        m.BloqueoMora
                    FROM 
                        UsuarioFinal u
                    OUTER APPLY (
                        SELECT TOP 1 
                            FechaPagoProgramado,
                            BloqueoMora
                        FROM 
                            EstadoCuentaMovimientos
                        WHERE 
                            EstadoCuentaMovimientos.IdUsuarioFinal = u.IdUsuarioFinal
                        ORDER BY 
                            FechaHoraMovimiento DESC
                    ) m
                    WHERE 
                        u.IdUsuarioFinal = @idUsuario
                `);
    
            return result.recordset[0]; // Devuelve solo el estado de cuenta del usuario
        } catch (err) {
            console.error("Error al traer saldo:", err);
            throw err;
        }
    }
    
};