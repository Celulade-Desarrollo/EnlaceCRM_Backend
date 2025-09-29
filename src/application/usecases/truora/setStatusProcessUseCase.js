import { TruoraService } from "../../services/TruoraService.js";

export async function setStatusProcessUseCase(process_id) {
    const data = await TruoraService.truoraInfoProcess(process_id);

    const validation_status = data.validations[0].validation_status
    const document_details = data.validations[0].details.document_details

    const birth_date = document_details.date_of_birth
    const birth_place = document_details.birth_place
    const issue_date = document_details.issue_date
    const birth_department = birth_place.split(" (")[1].replace(")","")
    const expedition_place = document_details.expedition_place


    const validation = await TruoraService.setTruoraStatusProcess(data.document_number, validation_status, birth_date, birth_department, birth_place, expedition_place, issue_date);
    return validation

}