import { verifyOperacionRepository } from "../repositories/verifyOperacionRepository.js";
import { VerifyOperacionPort } from "../../domain/ports/verifyOperacionPort.js";

export class VerifyOperacionAdapter extends VerifyOperacionPort {
  async existeOperacion(operacionId) {
    return await verifyOperacionRepository.existeOperacion(operacionId);
  }
}