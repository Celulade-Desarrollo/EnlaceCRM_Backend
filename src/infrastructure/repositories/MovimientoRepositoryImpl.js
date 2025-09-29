// [DEPRECADO]

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
          FechaHoraMovimiento,
          IdTipoMovimiento,
          IdEstadoMovimiento,
          Monto,
          Descripcion,
          FechaPagoProgramado
        FROM EstadoCuentaMovimientos
        WHERE IdUsuarioFinal = @clienteId
          AND FechaHoraMovimiento >= DATEADD(MONTH, -3, GETDATE())
        ORDER BY FechaHoraMovimiento DESC
      `);

      return result.recordset;
    } catch (error) {
      console.error("❌ Error en obtenerPorClienteUltimosTresMeses:", error.message);
      throw error;
    }
  }

  async obtenerTodosLosMovimientos() {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                ECM.IdMovimiento,
                ECM.IdUsuarioFinal,
                ECM.FechaHoraMovimiento,
                ECM.IdTipoMovimiento,
                ECM.IdEstadoMovimiento,
                ECM.Monto,
                ECM.Descripcion,
                ECM.FechaPagoProgramado,
                UF.Cedula_Usuario
            FROM 
                EstadoCuentaMovimientos ECM
            INNER JOIN 
                UsuarioFinal UF ON ECM.IdUsuarioFinal = UF.IdUsuarioFinal
            WHERE 
                ECM.IdTipoMovimiento = 1
            ORDER BY 
                ECM.FechaHoraMovimiento DESC
        `);

        return result.recordset;
    } catch (error) {
        console.error("Error en obtenerTodosLosMovimientos:", error.message);
        throw error;
    }
}

async actualizarMontoMovimiento(idMovimiento, nuevoMonto) {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("idMovimiento", sql.Int, idMovimiento)
            .input("monto", sql.Decimal(18,2), nuevoMonto)
            .query(`
                UPDATE EstadoCuentaMovimientos 
                SET Monto = @monto
                WHERE IdMovimiento = @idMovimiento;

                -- Retornar el registro actualizado
                SELECT 
                    ECM.IdMovimiento,
                    ECM.IdUsuarioFinal,
                    ECM.FechaHoraMovimiento,
                    ECM.IdTipoMovimiento,
                    ECM.IdEstadoMovimiento,
                    ECM.Monto,
                    ECM.Descripcion,
                    ECM.FechaPagoProgramado,
                    UF.Cedula_Usuario
                FROM EstadoCuentaMovimientos ECM
                INNER JOIN UsuarioFinal UF ON ECM.IdUsuarioFinal = UF.IdUsuarioFinal
                WHERE ECM.IdMovimiento = @idMovimiento;
            `);

        if (result.recordset.length === 0) {
            throw new Error("No se encontró el movimiento especificado");
        }

        return result.recordset[0];
    } catch (error) {
        console.error("Error en actualizarMontoMovimiento:", error.message);
        throw error;
    }
}
}