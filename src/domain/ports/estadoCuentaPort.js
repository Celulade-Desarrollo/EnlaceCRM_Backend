class EstadoCuentaPort {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async obtenerEstadoCuenta(identificadorTendero) {
    return await this.adapter.obtenerEstadoCuenta(identificadorTendero);
  }
}

export { EstadoCuentaPort };
