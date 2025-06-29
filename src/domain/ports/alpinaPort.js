class AlpinaPort {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async obtenerFacturasPendientes(identificadorTendero) {
    return await this.adapter.obtenerFacturasPendientes(identificadorTendero);
  }
}

//module.exports = { AlpinaPort };

export {  AlpinaPort }; 