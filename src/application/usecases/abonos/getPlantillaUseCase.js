import { sql, poolPromise } from "../../../infrastructure/persistence/database.js";

export const getPlantillaData = async () => {
  const pool = await poolPromise;

  const result = await pool.request().query(`
    SELECT DISTINCT
      u.Cedula_Usuario                      AS NumeroID,
      f.Nombres + ' ' + f.Primer_Apellido   AS Persona
    FROM [EnlaceCRM].[dbo].[UsuarioFinal] u
    JOIN [EnlaceCRM].[dbo].[FlujosRegistroEnlace] f 
      ON u.IdFlujoRegistro = f.Id
    JOIN [EnlaceCRM].[dbo].[EstadoCuentaMovimientos] e
      ON e.IdUsuarioFinal = u.IdUsuarioFinal
    WHERE e.IdEstadoMovimiento = 2
    AND NOT EXISTS (
      SELECT 1 FROM [EnlaceCRM].[dbo].[Abonos] a
      WHERE a.NumeroID = u.Cedula_Usuario
    )
  `);

  return result.recordset;
};