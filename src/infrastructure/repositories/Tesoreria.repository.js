import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const tesoreriaRepository = {
    async crearRegistroEnTesoreria(data) {
        try {
            const pool = await poolPromise;
            await pool.request()
                .input("id", sql.BigInt, data.id)
                .input("fecha", sql.DateTime2, data.fecha)
                .input("recaudo", sql.BigInt, data.recaudo)
                .input("dispersion", sql.NVarChar(50), data.dispersion)
                .input("tesoreria_status", sql.Bit, data.tesoreria_status)
                .input("banco_status", sql.Bit, data.banco_status)
                .query(`
                    INSERT INTO Tesoreria (id, fecha, recaudo, dispersion, tesoreria_status, banco_status)
                    VALUES (@id, @fecha, @recaudo, @dispersion, @tesoreria_status, @banco_status);
                `);
        } catch (err) {
            console.error("Error al crear registro en Tesoreria:", err.message);
            throw err;
        }
    },
    async actualizarEstadoTesoreria(id, nuevoEstadoTesoreria) {
        try {
            const pool = await poolPromise;
            await pool.request()
                .input("id", sql.BigInt, id)
                .input("tesoreria_status", sql.Bit, nuevoEstadoTesoreria)
                .query(`
                    UPDATE Tesoreria
                    SET tesoreria_status = @tesoreria_status
                    WHERE id = @id;
                `);
        } catch (err) {
            console.error("Error al actualizar estado de Tesoreria:", err.message);
            throw err;
        }},
    async actualizarEstadoBanco(id, nuevoEstadoBanco) {
        try {
            const pool = await poolPromise;
            await pool.request()
                .input("id", sql.BigInt, id)
                .input("banco_status", sql.Bit, nuevoEstadoBanco)
                .query(`
                    UPDATE Tesoreria
                    SET banco_status = @banco_status
                    WHERE id = @id;
                `);
        } catch (err) {
            console.error("Error al actualizar estado de Banco:", err.message);
            throw err;
        }}   
}
