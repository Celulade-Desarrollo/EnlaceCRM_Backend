import { TruoraService } from "../../services/TruoraService.js";

export async function setStatusProcessUseCase(process_id) {
    const data = await TruoraService.truoraInfoProcess(process_id);

    const validation_status = data.status
    const declined_reason = data.declined_reason;
    const document_details = data.validations[0].details.document_details

    const birth_date = document_details.date_of_birth
    const birth_place = document_details.birth_place
    const issue_date = document_details.issue_date
    const birth_department = birth_place.split(" (")[1].replace(")","")
    const expedition_place = document_details.expedition_place


    const validation = await TruoraService.setTruoraStatusProcess(data.document_number, validation_status, birth_date, birth_department, birth_place, expedition_place, issue_date);
    const declinedReasons = {
    similarity_threshold_not_passed: "Similaridad entre rostros fallida",
    government_database_unavailable: "Base de datos gubernamental no disponible",
    system_error: "Error de la plataforma al procesar el registro"
};

const declinedReasonMessage =  declinedReasons[data.declined_reason] ??
  "No fue posible validar tu identidad.";
    return {
        ...validation,
         declined_reason,
        declined_reason_message: declinedReasonMessage
    };
}