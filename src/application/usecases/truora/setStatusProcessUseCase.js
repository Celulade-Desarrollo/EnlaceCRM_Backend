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
        blurry_image:"imagen borrosa",
        damaged_document:"documento dañado",
        incomplete_document:"documento incompleto",
        empty_input_file:"Archivo de entrada vacío",
        invalid_image_format:"Formato de imagen no válido",
        invalid_or_corrupted_image_file:"Archivo de imagen no válido o dañado",
        document_not_recognized:"Documento no reconocido",
        front_document_not_found:"Documento frontal no encontrado",
        reverse_document_not_found:"Documento inverso no encontrado",
        face_not_detected:"Rostro no detectado",
        no_face_detected:"Rostro no detectado",
        ocr_failed:"",
        ocr_no_text_detected:"",
        missing_text:"texto faltante",
        "missing_*":"desaparecid@",
        no_face_detected:"No se detectó ningún rostro",
        file_format_not_supported:"formato de archivo no compatible",
        invalid_file_format:"formato de archivo no válido",
        invalid_video_file:"archivo de video no válido",
        speech_match_not_passed:"coincidencia de voz no superada",
        abandoned_without_using_retries:"abandonado sin usar reintentos",
        canceled:"cancelad@",	
        not_used:"no usado",
        unwanted_camera_permissions:"",
        no_document_media_uploaded: "No se ha subido ningún documento multimedia",
        "no_*_validation_not_started":"",
        process_started_late:"El proceso se inició tarde",
        validation_not_finished:"La validación no ha finalizado",
        validation_expired:"validación expirada",
        "expired_reason:input_file_not_uploaded":"No se ha cargado el archivo de entrada",
        "expired_reason:manual_review_expired": "La revisión manual ha caducado",
        "expired_reason:pending_validation_methods": "métodos de validación pendientes"
    };

    const declinedReasonMessage =  declinedReasons[data.declined_reason] ??
     "No fue posible validar tu identidad.";
    return {
        ...validation,
         declined_reason,
        declined_reason_message: declinedReasonMessage
    };
}