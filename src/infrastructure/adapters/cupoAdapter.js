import { CupoPort } from "../../domain/ports/CupoPort.js";
import { cupoRepository } from "../repositories/cupo.repository.js";

export class CupoAdapter extends CupoPort {
  
  async actualizarCupoPorId(id, cupo) {
    return await cupoRepository.actualizarCupoPorId(id, cupo);
  }
}