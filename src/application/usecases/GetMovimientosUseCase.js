export class GetMovimientosUseCase {
  constructor(movimientoRepository) {
    this.movimientoRepository = movimientoRepository;
  }

  async execute(clienteId) {
    return await this.movimientoRepository.obtenerPorClienteUltimosTresMeses(clienteId);
  }
}
