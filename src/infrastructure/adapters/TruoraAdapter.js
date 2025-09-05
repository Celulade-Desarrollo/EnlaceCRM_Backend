import { truoraRepository } from "../repositories/truora.repository.js";
import { TruoraPort } from "../../domain/ports/TruoraPort.js";

export class TruoraAdapter extends TruoraPort {
    async verificarInfoCedula(info) {
        return await truoraRepository.verificarInfoCedula(info)
    }
}