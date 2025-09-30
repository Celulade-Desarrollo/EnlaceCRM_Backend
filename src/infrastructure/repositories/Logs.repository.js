import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const logsRepository = {
    async generarLog(Usuario, Rol, Proceso, Fecha, Descripcion) {    
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('Usuario', Usuario)
            .input('Rol', Rol)
            .input('Proceso', Proceso)
            .input('Fecha', Fecha)
            .input('Descripcion', Descripcion)

            .query(`
                INSERT INTO Logs (Usuario, Rol, Proceso, Fecha, Descripcion)
                VALUES (@Usuario, @Rol, @Proceso, @Fecha, @Descripcion)
            `);
    } catch (err) {
        console.error("Error insertando log:", err);
    }
},
    async obtenerTodosLosLogs() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Logs");
    return result.recordset;
  }
}
