import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const cupoRepository = {
    
  async actualizarCupoPorId(id, cupo) {
        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);

        try {
            await transaction.begin();

            const request = new sql.Request(transaction);

            await request
            .input("id", sql.Int, id)
            .input("cupo", sql.NVarChar(100), cupo)
            .query(`
                UPDATE FlujosRegistroEnlaceScoring 
                SET Cupo = @cupo,
                 CupoConfirmado = 1
                WHERE IdFlujoRegistro = @id;
                

                UPDATE UsuarioFinal 
                SET CupoFinal = @cupo 
                WHERE IdFlujoRegistro = @id;
            `);

            await transaction.commit();

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}