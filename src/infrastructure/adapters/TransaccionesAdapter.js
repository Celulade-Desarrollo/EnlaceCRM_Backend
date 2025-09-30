import { TransaccionesPort } from "../../domain/ports/TransaccionesPort.js";
import sql from "mssql";

export class TransaccionesAdapter extends TransaccionesPort {
  constructor(poolPromise) {
    super();
    this.poolPromise = poolPromise;
  }

  async obtenerTodasTransacciones() {
    const pool = await this.poolPromise;
    const result = await pool.request().query(`
      SELECT 
        u.Cedula_Usuario AS cedula,
        fr.Nombres AS nombre,
        fr.Primer_Apellido AS apellido1,
        fr.[2do_Apellido_opcional] AS apellido2,
        m.IdMovimiento AS id,
        m.NroFacturaAlpina AS codigoFactura,
        m.Monto AS valor,
        m.CodigoTransaccionPropio AS codigoTransaccionPropio,
        CONVERT(VARCHAR(10), m.FechaHoraMovimiento, 23) AS fecha,
        CONVERT(VARCHAR(8), m.FechaHoraMovimiento, 108) AS hora
      FROM EstadoCuentaMovimientos m
      INNER JOIN UsuarioFinal u 
        ON m.IdUsuarioFinal = u.IdUsuarioFinal
      LEFT JOIN dbo.FlujosRegistroEnlace fr
        ON u.Cedula_Usuario = fr.Cedula_Cliente
      ORDER BY m.FechaHoraMovimiento DESC
    `);
    return result.recordset;
  }

  async obtenerPorIdMovimiento(id) {
    const pool = await this.poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT 
          u.Cedula_Usuario AS cedula,
          fr.Nombres AS nombre,
          fr.Primer_Apellido AS apellido1,
          fr.[2do_Apellido_opcional] AS apellido2,
          m.IdMovimiento AS id,
          m.NroFacturaAlpina AS codigoFactura,
          m.Monto AS valor,
          m.CodigoTransaccionPropio AS codigoTransaccionPropio,
          CONVERT(VARCHAR(10), m.FechaHoraMovimiento, 23) AS fecha,
          CONVERT(VARCHAR(8), m.FechaHoraMovimiento, 108) AS hora
        FROM EstadoCuentaMovimientos m
        INNER JOIN UsuarioFinal u 
          ON m.IdUsuarioFinal = u.IdUsuarioFinal
        LEFT JOIN dbo.FlujosRegistroEnlace fr
          ON u.Cedula_Usuario = fr.Cedula_Cliente
        WHERE m.IdMovimiento = @id
      `);
    return result.recordset[0];
  }

  async crear(datosTransaccion) {
    const pool = await this.poolPromise;
    const result = await pool.request()
      .input("cedula", sql.VarChar, datosTransaccion.cedula)
      .input("valor", sql.Decimal(18,2), datosTransaccion.valor)
      .input("codigoFactura", sql.VarChar, datosTransaccion.codigoFactura || null)
      .input("codigoTransaccionPropio", sql.VarChar, datosTransaccion.codigoTransaccionPropio)
      .input("fecha", sql.VarChar, datosTransaccion.fecha)
      .input("hora", sql.VarChar, datosTransaccion.hora)
      .query(`
        INSERT INTO EstadoCuentaMovimientos 
          (IdUsuarioFinal, Monto, NroFacturaAlpina, CodigoTransaccionPropio, FechaHoraMovimiento)
        VALUES (
          (SELECT IdUsuarioFinal FROM UsuarioFinal WHERE Cedula_Usuario = @cedula),
          @valor,
          @codigoFactura,
          @codigoTransaccionPropio,
          CONCAT(@fecha, ' ', @hora)
        );
        SELECT SCOPE_IDENTITY() AS id;
      `);
    return { id: result.recordset[0].id, ...datosTransaccion };
  }
}
