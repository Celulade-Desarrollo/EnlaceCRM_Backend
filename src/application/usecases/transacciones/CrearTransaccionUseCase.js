// src/application/usecases/transacciones/CrearTransaccionUseCase.js
export class CrearTransaccionUseCase {
  constructor(transaccionesService) {
    this.transaccionesService = transaccionesService;
  }

  async ejecutar(datosTransaccion) {
    // 👇 Aquí ya viene datosTransaccion.codigoTransaccionPropio
    if (!datosTransaccion.codigoTransaccionPropio) {
      throw new Error("El código de transacción propio es requerido");
    }

    return await this.transaccionesService.crear(datosTransaccion);
  }
}
