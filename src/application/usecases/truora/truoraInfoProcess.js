import { TruoraService } from "../../services/TruoraService.js";

export async function truoraInfoProcess(process_id) {
    return await TruoraService.truoraInfoProcess(process_id);

}