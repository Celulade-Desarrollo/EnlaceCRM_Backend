// src/domain/models/EstadoCuenta.js
export class EstadoCuenta {
  constructor({ movimientos, cupoDisponible, fechaSiguienteAbono, bloqueoPorMora }) {
    this.movimientos = movimientos;
    this.cupoDisponible = cupoDisponible;
    this.fechaSiguienteAbono = fechaSiguienteAbono || null;
    this.bloqueoPorMora = bloqueoPorMora || false;
    this.deudaTotal = this.calcularDeudaTotal();
    this.proveedoresHabilitados = []; // se podrá implementar después si aplica
  }

  calcularDeudaTotal() {
    return this.movimientos
      .filter(m => m.IdTipoMovimiento === 1 && m.IdEstadoMovimiento !== 3) // Deudas activas
      .reduce((total, m) => total + parseFloat(m.Monto || 0), 0);
  }
}
