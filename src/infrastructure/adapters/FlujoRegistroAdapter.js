import { flujoRegistroRepository } from "../repositories/flujoRegistro.repository.js";

import { FlujoRegistroPort } from "../../domain/ports/FlujoRegistroPort.js";

export class FlujoRegistroAdapter extends FlujoRegistroPort {
  
  async obtenerPorCedulaYNbCliente( nbCliente) {
    return await flujoRegistroRepository.obtenerPorCedulaYNbCliente(nbCliente);
  }
  async obtenerEstadoYCupo(nbCliente) {
    return await flujoRegistroRepository.obtenerEstadoYCupo(nbCliente);
  }

  async obtenerScoringPorFlujo(idFlujoRegistro) {
    return await flujoRegistroRepository.obtenerScoringPorFlujo(idFlujoRegistro);
  }

  async obtenerBancoPorFlujo(idFlujoRegistro) {
    return await flujoRegistroRepository.obtenerBancoPorFlujo(idFlujoRegistro);
  }

  async obtenerEstadoYCupoTodos() {
  return await flujoRegistroRepository.obtenerEstadoYCupoTodos();
  }



  async verificarDuplicados(input) {
    return await flujoRegistroRepository.verificarDuplicados(input);
  }

  async insertarRegistro(input) {
    return await flujoRegistroRepository.insertarRegistro(input);
  }

  async obtenerTodos() {
    return await flujoRegistroRepository.obtenerTodos();
  }

  async obtenerPorId(id) {
    return await flujoRegistroRepository.obtenerPorId(id);
  }

  async obtenerPorEstado(estado) {
    return await flujoRegistroRepository.obtenerPorEstado(estado);
  }

  async actualizarEstadoPorId(id, estado) {
    return await flujoRegistroRepository.actualizarEstadoPorId(id, estado);
  }

   async actualizarclienteAcceptoPorId(id, respuestaCliente) {
    return await flujoRegistroRepository.actualizarClienteAproboporId(id, respuestaCliente);
  }

  async eliminarPorId(id) {
    return await flujoRegistroRepository.eliminarPorId(id);
  }
  async obtenerPorNumeroClienteAlpina(alpinaId) {
    return await flujoRegistroRepository.obtenerPorNumeroClienteAlpina(alpinaId);
  }

  async obtenerPorNumeroCelular(numeroCelular) {
    return await flujoRegistroRepository.obtenerPorNumeroCelular(numeroCelular);
  }

}
