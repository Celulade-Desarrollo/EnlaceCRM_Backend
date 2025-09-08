import { truoraRepository } from "../repositories/truora.repository.js";
import { TruoraPort } from "../../domain/ports/TruoraPort.js";

export class TruoraAdapter extends TruoraPort {
    async verificarInfoCedula(cedula) {
        return await truoraRepository.verificarInfoCedula(cedula)
    }
}