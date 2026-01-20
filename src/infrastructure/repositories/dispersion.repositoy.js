import { poolPromise } from "../persistence/database.js";

export const dispersionRepository = {
    async obtenerDispersiones() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query("SELECT * FROM Tesoreria");
            return result.recordset;
        } catch (error) {
            console.error("Error en obtenerDispersiones:", error.message);
            throw error;
        }
    }
};