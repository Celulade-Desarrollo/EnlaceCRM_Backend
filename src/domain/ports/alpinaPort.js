class AlpinaPort {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async obtenerFacturasPendientes(identificadorTendero, token) {
    return await this.adapter.obtenerFacturasPendientes(identificadorTendero, token);
  }
}

export { AlpinaPort };
