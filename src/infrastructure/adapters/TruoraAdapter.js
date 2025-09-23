import { truoraRepository } from "../repositories/truora.repository.js";
import { TruoraPort } from "../../domain/ports/TruoraPort.js";

export class TruoraAdapter extends TruoraPort {
    async truoraInfoProcess(process_id) {
        return await truoraRepository.truoraInfoProcess(process_id)
    }

    async setTruoraStatusProcess(document_number, validation_status, birth_date, birth_department, birth_place, expedition_place, issue_date) {
        return await truoraRepository.setTruoraStatusProcess(document_number, validation_status, birth_date, birth_department, birth_place, expedition_place, issue_date)
    }
}