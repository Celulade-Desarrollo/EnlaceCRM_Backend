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
        government_database_unavailable: "Base de datos gubernamental no disponible",
        system_error: "Error de la plataforma al procesar el registro",
        data_not_match_with_government_database: "Datos del documento no coinciden con la BD gobierno",
        document_unregistered: "Documento no registrado en la BD gobierno",
        document_has_expired: "Documento vencido",
        identity_belongs_to_dead_person: "Identidad de persona fallecida",
        underage:"menor de edad",
        age_above_threshold: "Edad por encima del umbral",
        invalid_mrz:"MRZ/QR inconsistente con el documento",
        invalid_mrz_format:"MRZ/QR inconsistente con el documento",
        invalid_qr_content:"MRZ/QR inconsistente con el documento",
        national_registrar_inconsistency :"Inconsistencias internas del documento",
        "production_data_*":"Inconsistencias internas del documento",
        document_is_a_photo_of_photo:"Copia o foto de pantalla",
        document_is_a_photocopy:"Copia o foto de pantalla",
        "lados front/reverse":"Copia o foto de pantalla",
        image_face_validation_not_passed:"Posible alteración de cara o textos",
        image_text_validation_not_passed:"Posible alteración de cara o textos",
        portrait_photo_is_fake:"foto de retrato falsa",
        possible_fraud:"Posible fraude",
        risk_signal_detected:"Señal de riesgo/señales de fraude",
        similarity_threshold_not_passed: "umbral de similitud no superado",
        photo_of_photo:"foto de una foto",
        liveness_verification_not_passed:"",
        passive_liveness_verification_not_passed:"",
        "fraudster_face_match_*" :"",
        face_in_blocklist:"rostro en lista de bloqueo",  
        risky_face_detected:"Se ha detectado un rostro de riesgo",
        user_face_match_in_client_collection:"",
        face_validation_failed:"Error en la validación facial",
        

    };

const declinedReasonMessage =  declinedReasons[data.declined_reason] ??
  "No fue posible validar tu identidad.";
    return {
        ...validation,
         declined_reason,
        declined_reason_message: declinedReasonMessage
    };
}