import sql from 'mssql'; 
import { poolPromise } from '../persistence/database.js'; 

export const guardarDatosBanco = async (datos) => {
    try {
        const pool = await poolPromise;

        for (const t of datos) {
            const query = `
                MERGE INTO utilizacion_intereses AS target
                USING (SELECT @codigo AS cod) AS source
                ON (target.[Código Transacción] = source.cod)
                WHEN MATCHED THEN
                    UPDATE SET [Intereses] = @intereses, [Fees] = @fees
                WHEN NOT MATCHED THEN
                    INSERT ([Cédula], [Nombre], [Apellido], [Código Transacción], [Factura], [Valor], [Fecha], [Hora], [Intereses], [Fees])
                    VALUES (@cedula, @nombre, @apellido, @codigo, @factura, @valor, @fecha, @hora, @intereses, @fees);
            `;

            let fechaFinal = t['Fecha'];
            if (fechaFinal instanceof Date) {
                fechaFinal = fechaFinal.toISOString().split('T')[0];
            }

            let horaFinal = t['Hora'];
            if (horaFinal instanceof Date) {
                horaFinal = horaFinal.toTimeString().split(' ')[0];
            } else if (typeof horaFinal === 'number') {
                const totalSeconds = Math.round(horaFinal * 86400);
                const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
                const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
                const s = (totalSeconds % 60).toString().padStart(2, '0');
                horaFinal = `${h}:${m}:${s}`;
            }

            await pool.request()
                .input('cedula', sql.VarChar, String(t['Cédula'] || ''))
                .input('nombre', sql.VarChar, t['Nombre'] || '')
                .input('apellido', sql.VarChar, t['Apellido'] || '')
                .input('codigo', sql.VarChar, String(t['Código Transacción'] || ''))
                .input('factura', sql.VarChar, String(t['Factura'] || ''))
                .input('valor', sql.Decimal(15, 2), t['Valor'] || 0)
                .input('fecha', sql.VarChar, fechaFinal)
                .input('hora', sql.VarChar, horaFinal)
                .input('intereses', sql.Decimal(15, 2), t['Intereses'] || 0)
                .input('fees', sql.Decimal(15, 2), t['Fees'] || 0)
                .query(query);
        }
    } catch (err) {
        console.error("Error en guardarDatosBanco:", err);
        throw err;
    }
};

export const obtenerTodoParaAdmin = async () => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                [Cédula], 
                [Nombre], 
                [Apellido], 
                [Código Transacción], 
                [Factura], 
                FORMAT([Valor], 'C', 'es-CO') AS [Valor],
                FORMAT([Fecha], 'yyyy-MM-dd') AS [Fecha],
                CONVERT(VARCHAR, [Hora], 108) AS [Hora],
                FORMAT([Intereses], 'C', 'es-CO') AS [Intereses],
                FORMAT([Fees], 'C', 'es-CO') AS [Fees],
                FORMAT([fecha_creacion], 'yyyy-MM-dd HH:mm:ss') AS [Fecha Registro]
            FROM utilizacion_intereses
        `);
        return result.recordset;
    } catch (err) {
        console.error("Error en obtenerTodoParaAdmin:", err);
        throw err;
    }
};