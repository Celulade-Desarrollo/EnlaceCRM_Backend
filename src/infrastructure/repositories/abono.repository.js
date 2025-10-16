import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const abonoRepository = {
  async insertarAbono(abono) {
    try {
      console.log("Entrando a insertarAbono con datos:", abono);

      const pool = await poolPromise;
      await pool.request()
        .input("Operacion", sql.VarChar(50), String(abono.Operacion))
        .input("CuentaCliente", sql.Int(50), abono.CuentaCliente)
        .input("NumeroID", sql.Int(50), abono.NumeroID)
        .input("Persona", sql.NVarChar(100), abono.Persona)
        .input("IdEstadoProducto", sql.Int, abono.IdEstadoProducto)
        .input("FecTransaccion", sql.Date, abono.FecTransaccion)
        .input("CAPITAL", sql.Decimal(18, 2), abono.CAPITAL)
        .input("INTERESES", sql.Decimal(18, 2), abono.INTERESES)
        .input("INTERES_MORA", sql.Decimal(18, 2), abono.INTERES_MORA)
        .input("SEGUROS", sql.Decimal(18, 2), abono.SEGUROS)
        .input("TOTAL_PAGADO", sql.Decimal(18, 2), abono.TOTAL_PAGADO)
        .input("DIAS_MORA", sql.Int, abono.DIAS_MORA)
        .query(`
          INSERT INTO Abonos (
            Operacion, CuentaCliente, NumeroID, Persona, 
            IdEstadoProducto, FecTransaccion, CAPITAL, INTERESES, 
            INTERES_MORA, SEGUROS, TOTAL_PAGADO, DIAS_MORA
          )
          VALUES (
            @Operacion, @CuentaCliente, @NumeroID, @Persona,
            @IdEstadoProducto, @FecTransaccion, @CAPITAL, @INTERESES,
            @INTERES_MORA, @SEGUROS, @TOTAL_PAGADO, @DIAS_MORA
          );
        `);

      console.log("✅ Insert realizado con éxito en la base de datos.");
    } catch (err) {
      console.error("❌ Error al insertar abono en la base de datos:", err.message);
      throw new Error("Error al insertar abono: " + err.message);
    }
  }, 

  async obtenerDatosExcel() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Abonos");
    return result.recordset;
  }
};