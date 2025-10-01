import { poolPromise } from "../../infrastructure/persistence/database.js";
import sql from "mssql";

export const CodigoTransaccionService = {
  async generarSiguienteCodigo(cedula) {
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      const request = new sql.Request(transaction);

      // Traer último número para este tendero
      const result = await request
        .input("cedula", sql.VarChar, cedula)
        .query(`
          SELECT TOP 1 UltimoNumero
          FROM dbo.CodigoTransaccionContador
          WHERE Cedula = @cedula
          ORDER BY Id DESC
        `);

      let ultimo = result.recordset[0]?.UltimoNumero ?? 0;
      const siguiente = ultimo + 1;

      // Guardar nuevo número
      await request
        .input("cedula", sql.VarChar, cedula)
        .input("siguiente", sql.Int, siguiente)
        .query(`
          INSERT INTO dbo.CodigoTransaccionContador (Cedula, UltimoNumero, FechaActualizacion)
          VALUES (@cedula, @siguiente, GETDATE())
        `);

      await transaction.commit();

      return `T-${siguiente.toString().padStart(6, "0")}`;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
