export class EstadoCuenta {
  static MOVEMENT_TYPES = {
    DEBT: 1,
    CREDIT: 2,
    ADJUSTMENT: 3,
    INTEREST: 4,
    COMMISSION: 5
  };

  static MOVEMENT_STATES = {
    ACTIVE: 1,
    CANCELLED: 2
  };

  constructor({ movimientos, cupoDisponible, fechaSiguienteAbono, bloqueoPorMora }) {
    if (!Array.isArray(movimientos)) {
      throw new Error("movimientos debe ser un array");
    }

    if (cupoDisponible !== undefined && (isNaN(cupoDisponible) || cupoDisponible < 0)) {
      throw new Error("cupoDisponible debe ser un número no negativo");
    }

    this.movimientos = movimientos;
    this.cupoDisponible = cupoDisponible;
    this.fechaSiguienteAbono = fechaSiguienteAbono || null;
    this.bloqueoPorMora = bloqueoPorMora || false;
    this.deudaTotal = this.calcularDeudaTotal();
    this.proveedoresHabilitados = []; // se podrá implementar después si aplica
  }

  calcularDeudaTotal() {
    return this.movimientos
      .filter(
        m =>
          m.IdTipoMovimiento === EstadoCuenta.MOVEMENT_TYPES.DEBT &&
          m.IdEstadoMovimiento !== EstadoCuenta.MOVEMENT_STATES.CANCELLED
      )
      .reduce((total, m) => total + parseFloat(m.Monto || 0), 0);
  }
}
