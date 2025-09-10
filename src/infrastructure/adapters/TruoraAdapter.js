import { truoraRepository } from "../repositories/truora.repository.js";
import { TruoraPort } from "../../domain/ports/TruoraPort.js";

export class TruoraAdapter extends TruoraPort {
    async truoraInfoProcess(process_id) {
        return await truoraRepository.truoraInfoProcess(process_id)
    }

    async setTruoraStatusProcess(document_number, validation_status) {
        return await truoraRepository.setTruoraStatusProcess(document_number, validation_status)
    }
}