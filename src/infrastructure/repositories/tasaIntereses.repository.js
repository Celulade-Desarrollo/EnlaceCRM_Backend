import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const tasaInteresesRepository = {
  async obtenerTodos() {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT *
      FROM TasasIntereses
    `);

    return result.recordset;
  },

  async actualizarTasaIntereses(id, valorFactorSeguro, tasaEfectivaAnual, diasDuracionCuota) {
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      const request = new sql.Request(transaction);

      await request
        .input("id", sql.Int, id)
        .input("valorFactorSeguro", sql.Decimal(10, 5), valorFactorSeguro)
        .input("tasaEfectivaAnual", sql.Decimal(10, 5), tasaEfectivaAnual)
        .input("diasDuracionCuota", sql.Int, diasDuracionCuota)
        .query(`
          UPDATE TasasIntereses 
          SET
            valorFactorSeguro = CASE WHEN @valorFactorSeguro IS NOT NULL THEN @valorFactorSeguro ELSE valorFactorSeguro END,
            tasaEfectivaAnual = CASE WHEN @tasaEfectivaAnual IS NOT NULL THEN @tasaEfectivaAnual ELSE tasaEfectivaAnual END,
            diasDuracionCuota = CASE WHEN @diasDuracionCuota IS NOT NULL THEN @diasDuracionCuota ELSE diasDuracionCuota END
          WHERE Id = @id;
        `);

      await transaction.commit();

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
