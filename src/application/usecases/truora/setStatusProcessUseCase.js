import { TruoraService } from "../../services/TruoraService.js";

export async function setStatusProcessUseCase(process_id) {
    const data = await TruoraService.truoraInfoProcess(process_id);
    console.log(data)   

    const validation = await TruoraService.setTruoraStatusProcess(data.document_number, data.validations[0].validation_status);
    return validation

}