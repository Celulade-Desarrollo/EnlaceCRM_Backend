import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export function normalizeLogPayload({ Usuario, Rol, Proceso, Fecha, Descripcion }) {
    const getSafeString = (value, fallback) => {
        if (value === undefined || value === null || String(value).trim() === "") {
            return fallback;
        }
        return String(value);
    };

    return {
        Usuario: getSafeString(Usuario, "Sistema"),
        Rol: getSafeString(Rol, "Sistema"),
        Proceso: getSafeString(Proceso, "Sistema"),
        Fecha: Fecha instanceof Date ? Fecha : new Date(Fecha ?? Date.now()),
        Descripcion: getSafeString(Descripcion, "Sin descripcion"),
    };
}

export const logsRepository = {
    async generarLog(Usuario, Rol, Proceso, Fecha, Descripcion) {
        const payload = normalizeLogPayload({ Usuario, Rol, Proceso, Fecha, Descripcion });

        try {
            const pool = await poolPromise;
            await pool.request()
                .input('Usuario', sql.NVarChar(200), payload.Usuario)
                .input('Rol', sql.NVarChar(200), payload.Rol)
                .input('Proceso', sql.NVarChar(200), payload.Proceso)
                .input('Fecha', sql.DateTime, payload.Fecha)
                .input('Descripcion', sql.NVarChar(sql.MAX), payload.Descripcion)
                .query(`
                    INSERT INTO Logs (Usuario, Rol, Proceso, Fecha, Descripcion)
                    VALUES (@Usuario, @Rol, @Proceso, @Fecha, @Descripcion)
                `);

            return true;
        } catch (err) {
            console.error("Error insertando log:", err);
            throw err;
        }
    },

    async obtenerTodosLosLogs() {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Logs");
        return result.recordset;
    }
};
