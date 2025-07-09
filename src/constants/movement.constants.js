// PAGO  disminuye el saldo del tendero--Pago a Proveedor
// ABONO aunmenta el saldo del tendero--Pago una Cuota de mi cupo
export const MOVEMENT_TYPES = {
  PAGO: 1,
  ABONO: 2,
  AJUSTE: 3,
  INTERES: 4,
  COMISION: 5,
};

export const MOVEMENT_STATES = {
  PENDIENTE: 1,
  PAGADO: 2,
  VENCIDO: 3,
  PROGRAMADO: 4,
  ANULADO: 5,
  APLICADO: 6,
};

export const MOVEMENT_TYPE_NAMES = {
  [MOVEMENT_TYPES.PAGO]: "Pago",
  [MOVEMENT_TYPES.ABONO]: "Abono",
  [MOVEMENT_TYPES.AJUSTE]: "Ajuste",
  [MOVEMENT_TYPES.INTERES]: "Interes",
  [MOVEMENT_TYPES.COMISION]: "Comision",
};