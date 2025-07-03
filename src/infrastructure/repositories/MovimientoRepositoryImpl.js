import { poolPromise } from "../persistence/database.js";

export class MovimientoRepositoryImpl {
  async obtenerPorClienteUltimosTresMeses(clienteId) {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input("clienteId", clienteId);

      const result = await request.query(`
        SELECT 
          IdMovimiento,
          IdUsuarioFinal,
          FechaMovimiento,
          IdTipoMovimiento,
          IdEstadoMovimiento,
          Monto,
          Descripcion,
          FechaPagoProgramado
        FROM EstadoCuentaMovimientos
        WHERE IdUsuarioFinal = @clienteId
          AND FechaMovimiento >= DATEADD(MONTH, -3, GETDATE())
        ORDER BY FechaMovimiento DESC
      `);

      return result.recordset;
    } catch (error) {
      console.error("❌ Error en obtenerPorClienteUltimosTresMeses:", error.message);
      throw error;
    }
  }
}
