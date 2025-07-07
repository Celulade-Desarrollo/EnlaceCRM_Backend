export const confirmarPagoUseCase = async (adapter, datosPago = {}) => {
  const {
    identificadorTendero,
    monto,
    descripcion,
    fechaPagoProgramado,
    idMedioPago,
    nroFacturaAlpina,
    telefonoTransportista
  } = datosPago;

  console.log("📦 Datos recibidos en confirmarPagoUseCase:", datosPago);

  if (!identificadorTendero || !monto || isNaN(monto)) {
    throw new Error("identificadorTendero y monto válidos son requeridos");
  }

  return await adapter.registrarPago({
    identificadorTendero,
    monto,
    descripcion,
    fechaPagoProgramado,
    idMedioPago,
    nroFacturaAlpina,
    telefonoTransportista
  });
};
