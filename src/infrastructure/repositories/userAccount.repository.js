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

    
    async verificarNbCliente(nbCliente) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("nbCliente", sql.VarChar(50), nbCliente)
            .query(`SELECT * FROM FlujosRegistroEnlace WHERE nbCliente = @nbCliente AND Estado IN ('pendiente', 'aprobado','confirmado')
        `);
        return result.recordset[0];
    },

    

    async crearRegistro(input) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("IdFlujoRegistro", sql.Int, input.IdFlujoRegistro)
            .input("Numero_Cliente", sql.NVarChar, input.Numero_Cliente)
            .input("CupoFinal", sql.NVarChar, input.CupoFinal)
            .input("Cedula_Usuario", sql.NVarChar, input.Cedula_Usuario)
            .input("CupoDisponible",  sql.Decimal(18, 2), input.CupoDisponible)
            .query(`
                INSERT INTO UsuarioFinal (
                    IdFlujoRegistro, Numero_Cliente, CupoFinal, Cedula_Usuario, CupoDisponible
                ) VALUES (
                    @IdFlujoRegistro, @Numero_Cliente, @CupoFinal, @Cedula_Usuario, @CupoDisponible
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
    
    async validarCuentaCedula(cedula) {
    const pool = await poolPromise;

    const usuario = await pool
        .request()
        .input("Cedula_Usuario", sql.NVarChar, cedula)
        .query(`
            SELECT * 
            FROM EnlaceCRM.dbo.UsuarioFinal u 
            JOIN EnlaceCRM.dbo.FlujosRegistroEnlace f ON u.IdFlujoRegistro = f.Id
            WHERE f.Cedula_Cliente = @Cedula_Usuario
        `);

    const data = usuario.recordset[0];

     // No existe usuario
    if (!data) {
        const flujo = await pool
            .request()
            .input("Cedula_Usuario", sql.NVarChar, cedula)
            .query(`
                SELECT Estado 
                FROM EnlaceCRM.dbo.FlujosRegistroEnlace
                WHERE Cedula_Cliente = @Cedula_Usuario
            `);

        // Si no  existe un flujo
        if (!flujo.recordset[0]) {
            return null;
        }

        // Si existe un flujo pero no usuario, devolver solo el estado
        return { EstadoFlujo: flujo.recordset[0].Estado };
    }

    // Existe usuario, obtener estado del flujo
    const estado = await pool
        .request()
        .input("idFlujo", sql.Int, data.IdFlujoRegistro)
        .query(`
            SELECT Estado 
            FROM EnlaceCRM.dbo.FlujosRegistroEnlace
            WHERE Id = @idFlujo
        `);

    data.EstadoFlujo = estado.recordset[0]?.Estado || null;

    return data;
},

    async verificarCuentaSimple(cedula){
        const pool = await poolPromise;
        // Verificar si es un usuario final
        const usuario = await pool
          .request()
          .input("Cedula_Cliente", sql.NVarChar, cedula)
          .query(`            
                SELECT * 
                FROM EnlaceCRM.dbo.FlujosRegistroEnlace WHERE Cedula_Cliente  = @Cedula_Cliente
            `);
          return usuario.recordset[0]
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