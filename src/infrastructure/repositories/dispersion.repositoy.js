import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const dispersionRepository = {
    async obtenerDispersiones() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
            .query(`
                SELECT * FROM Tesoreria 
                WHERE tesoreria_status = 1 AND banco_status = 0 OR banco_status IS NULL
            `);
            return result.recordset;
        } catch (error) {
            console.error("Error en obtenerDispersiones:", error.message);
            throw error;
        }
    },
    async actualizarEstadoPorId(id, estado) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
            .input("id", sql.Int, id)
            .input("estado", sql.Bit, estado)
            .query(
                "UPDATE Tesoreria SET banco_status = @estado WHERE id = @id"
            );

            if (result.rowsAffected[0] === 0) {
            throw new Error("No se encontró la dispersión");
            }
        } catch (error) {
            console.error("Error en actualizarEstadoPorId:", error.message);
            throw error;
        }
    }
};