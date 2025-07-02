// src/infrastructure/repositories/estadoCuentaPago.repository.js

import sql from "mssql";
import { poolPromise } from "../persistence/database.js";

export const estadoCuentaPagoRepository = {
  async registrarPago({ identificadorTendero, monto, descripcion, fechaPagoProgramado }) {
    const pool = await poolPromise;
    const query = `
      INSERT INTO EstadoCuentaMovimientos 
        (IdUsuarioFinal, IdTipoMovimiento, IdEstadoMovimiento, Monto, Descripcion, FechaPagoProgramado)
      VALUES 
        ((SELECT IdUsuarioFinal FROM UsuarioFinal WHERE Cedula_Usuario = @identificador), 2, 1, @monto, @descripcion, @fechaProgramada)
    `;

    await pool.request()
      .input("identificador", sql.VarChar, identificadorTendero)
      .input("monto", sql.Decimal(18, 2), monto)
      .input("descripcion", sql.VarChar, descripcion || null)
      .input("fechaProgramada", sql.Date, fechaPagoProgramado || null)
      .query(query);

    return { mensaje: "Pago registrado exitosamente" };
  },

  async obtenerEstadoCuentaPorCedula(cedula) {
    const pool = await poolPromise;
    const query = `
      SELECT * FROM EstadoCuentaMovimientos
      WHERE IdUsuarioFinal = (SELECT IdUsuarioFinal FROM UsuarioFinal WHERE Cedula_Usuario = @cedula)
    `;

    const result = await pool.request()
      .input("cedula", sql.VarChar, cedula)
      .query(query);

    return result.recordset;
  },

  // Puedes agregar más funciones como calcular deuda total, cupo disponible, etc.
};
