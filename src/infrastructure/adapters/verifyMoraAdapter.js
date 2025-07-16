  import { VerifyMoraPort } from "../../domain/ports/VerifyMoraPort.js";
  import { verifyMoraRepository } from "../repositories/verifyMora.repository.js";
  export class VerifyMoraAdapter extends VerifyMoraPort {
    async obtenerUsuariosConPagosVencidos() {
      return await verifyMoraRepository.obtenerUsuariosConPagosVencidos();
    }

    async marcarUsuarioEnMora(idUsuario, nroFactura) {
      return await verifyMoraRepository.marcarUsuarioEnMora(idUsuario, nroFactura);
    }

    async quitarMoraSiPago(idUsuario, nroFactura) {
      return await verifyMoraRepository.quitarMoraSiPago(idUsuario, nroFactura);
    }


    async existePagoParaFactura(idUsuario, nroFactura) {
      return await verifyMoraRepository.existePagoParaFactura(idUsuario, nroFactura);
    }

    async obtenerUFacturasAbonadas() {
    return await verifyMoraRepository.obtenerUFacturasAbonadas();
  }

  async desmarcarFacturasPagadas() {
    console.log("Adapter: desmarcarFacturasPagadas called");
    return await verifyMoraRepository.desmarcarFacturasPagadas();
  }


  }