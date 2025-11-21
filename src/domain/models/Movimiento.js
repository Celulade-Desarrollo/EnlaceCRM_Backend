export class Movimiento {
  constructor({
    identificadorTendero,
    monto,
    tipoMovimiento,
    descripcion,
    fechaPagoProgramado,
    idMedioPago,
    nroFacturaAlpina,
    telefonoTransportista
  }) {
    // Validar identificadorTendero
    if (
      !identificadorTendero ||
      typeof identificadorTendero !== "string" ||
      identificadorTendero.trim() === ""
    ) {
      throw new Error("identificadorTendero debe ser una cadena válida no vacía");
    }

    // Validar monto
    if (monto === undefined || monto === null || monto === "") {
      throw new Error("monto es requerido");
    }

    const numericMonto = Number(monto);
    if (isNaN(numericMonto) || numericMonto <= 0) {
      throw new Error("monto debe ser un número válido mayor que cero");
    }

    // Validar tipoMovimiento
    const TIPOS_MOVIMIENTO = {
      DEBITO: 1,
      CREDITO: 2,
      AJUSTE: 3,
      REVERSO: 4,
      TRANSFERENCIA: 5
    };

    const TIPOS_MOVIMIENTO_VALIDOS = Object.values(TIPOS_MOVIMIENTO);

    if (!tipoMovimiento || !TIPOS_MOVIMIENTO_VALIDOS.includes(tipoMovimiento)) {
      throw new Error("tipoMovimiento debe ser un valor válido entre 1 y 5");
    }

// propiedades 
    this.identificadorTendero = identificadorTendero;
    this.monto = numericMonto;
    this.tipoMovimiento = tipoMovimiento;
    this.descripcion = descripcion || "";
    this.fechaPagoProgramado = fechaPagoProgramado || null;
    this.idMedioPago = idMedioPago || null;
    this.nroFacturaAlpina = nroFacturaAlpina || null;
    this.telefonoTransportista = telefonoTransportista || null;
  }
}