import { TruoraService } from "../../services/TruoraService.js";

export async function truoraCedulaUseCase(info) {
    const persona = await TruoraService.verificarInfoCedula(info);
    if(!persona || persona.length === 0) throw new Error("No se encontró información para la cédula proporcionada.");
    
    console.log("Registro de truora",persona);

    return persona;
}