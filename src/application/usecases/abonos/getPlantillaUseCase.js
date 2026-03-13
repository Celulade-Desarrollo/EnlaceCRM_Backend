import { sql, poolPromise } from "../../../infrastructure/persistence/database.js";

export const getPlantillaData = async () => {
  const pool = await poolPromise;

  const result = await pool.request().query(`
    SELECT 
      f.Id             AS Operacion,
      f.Cedula_Cliente AS NumeroID,
      f.Nombres        AS Persona
    FROM [EnlaceCRM].[dbo].[FlujosRegistroEnlace] f
    WHERE NOT EXISTS (
      SELECT 1 FROM [EnlaceCRM].[dbo].[Abonos] a
      WHERE a.Operacion = f.Id
    )
  `);

  return result.recordset;
};