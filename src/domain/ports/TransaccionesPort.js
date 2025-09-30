export class TransaccionesPort {
  async obtenerTodasTransacciones() {
    throw new Error('Debe implementar obtenerTodasTransacciones');
  }

  async obtenerPorIdMovimiento(id) {
    throw new Error('Debe implementar obtenerPorIdMovimiento');
  }

  async obtenerParaExcel() {
    throw new Error('Debe implementar obtenerParaExcel');
  }

  async crearTransaccion(datos) {
    throw new Error('Debe implementar crearTransaccion');
  }
}
