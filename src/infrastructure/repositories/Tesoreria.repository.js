import { poolPromise } from "../persistence/database.js";
import sql from "mssql";
import { estadoCuentaRepository } from "./estadoCuenta.repository.js";

export const tesoreriaRepository = {
    async crearRegistroEnTesoreria(dataArray) {
        try {
            const pool = await poolPromise;
            for (const data of dataArray) {
                await pool.request()
                    .input("fecha", sql.DateTime2, data.fecha)
                    .input("recaudo", sql.BigInt, data.recaudo)
                    .input("dispersion", sql.NVarChar(50), data.dispersion)
                    .input("tesoreria_status", sql.Bit, data.tesoreria_status)
                    .input("banco_status", sql.Bit, data.banco_status)
                    .query(`
                        INSERT INTO Tesoreria (fecha, recaudo, dispersion, tesoreria_status, banco_status)
                        VALUES (@fecha, @recaudo, @dispersion, @tesoreria_status, @banco_status);
                    `);
            }
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
        }},
    async existeRegistroPorFecha(fecha) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("fecha", sql.Date, fecha) // Usar sql.Date para comparar solo fecha
                .query(`
                    SELECT COUNT(*) as count
                    FROM Tesoreria
                    WHERE CAST(fecha AS DATE) = @fecha;
                `);
            return result.recordset[0].count > 0;
        } catch (err) {
            console.error("Error al verificar existencia por fecha:", err.message);
            throw err;
        }
    },
    async actualizarDispersion(id, nuevaDispersion) {
        try {
            const pool = await poolPromise;
            await pool.request()
                .input("id", sql.BigInt, id)
                .input("dispersion", sql.NVarChar(50), nuevaDispersion)
                .query(`
                    UPDATE Tesoreria
                    SET dispersion = @dispersion
                    WHERE id = @id;
                `);
        } catch (err) {
            console.error("Error al actualizar dispersion:", err.message);
            throw err;
        }
    },
    async guardarDatosEnLaTablaRecaudo(fecha, recaudo){
        try {
            const pool = await poolPromise;
            await pool.request()
            .input("fecha", sql.Date, fecha)
            .input("recaudo", sql.BigInt, recaudo)
            .query(`
                INSERT INTO Recaudo (fecha, recaudo)
                VALUES (@fecha, @recaudo);
            `);
        } catch (err) {
            console.error("Error al guardar datos en la tabla Recaudo:", err.message);
            throw err;
        }
    },
    async existeRecaudoPorFecha(fecha) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("fecha", sql.Date, fecha)
                .query(`
                    SELECT COUNT(*) as count
                    FROM Recaudo
                    WHERE CAST(fecha AS DATE) = @fecha;
                `);
            return result.recordset[0].count > 0;
        } catch (err) {
            console.error("Error al verificar existencia en Recaudo por fecha:", err.message);
            throw err;
        }
    },
    async procesarYGuardarRecaudo() {
        try {
            const recaudoData = await estadoCuentaRepository.consultarRecaudoTransportistaPorFecha();
            const filteredRecaudo = [];
            for (const item of recaudoData) {
                const fechaNormalizada = new Date(item.fecha.getFullYear(), item.fecha.getMonth(), item.fecha.getDate());
                const existe = await this.existeRecaudoPorFecha(fechaNormalizada);
                if (!existe) {
                    filteredRecaudo.push(item);
                }
            }
            for (const item of filteredRecaudo) {
                await this.guardarDatosEnLaTablaRecaudo(item.fecha, item.recaudo);
            }
            return filteredRecaudo.length;
        } catch (err) {
            console.error("Error al procesar y guardar recaudo:", err.message);
            throw err;
        }
    },
    async consultarDatosRecaudo() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`
                    SELECT fecha, recaudo
                    FROM Recaudo
                    WHERE status = 0 OR status IS NULL
                    ORDER BY fecha DESC;
                `);
            return result.recordset;
        } catch (err) {
            console.error("Error al consultar datos de recaudo:", err.message);
            throw err;
        }
    },
    async consultarRegistrosSinDispersion() {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`
                    SELECT id, fecha, recaudo, dispersion, tesoreria_status, banco_status
                    FROM Tesoreria
                    WHERE dispersion IS NULL
                    ORDER BY fecha DESC;
                `);
            return result.recordset;
        } catch (err) {
            console.error("Error al consultar registros sin dispersión:", err.message);
            throw err;
        }
    },
    async actualizarStatusRecaudo(fecha) {
        try {
            const pool = await poolPromise;
            await pool.request()
                .input("fecha", sql.Date, fecha)
                .query(`
                    UPDATE Recaudo
                    SET status = 1
                    WHERE CAST(fecha AS DATE) = @fecha;
                `);
        } catch (err) {
            console.error("Error al actualizar status de recaudo:", err.message);
            throw err;
        }
    }
}
