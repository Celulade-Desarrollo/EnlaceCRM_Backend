import { tesoreriaService } from "../../services/TesoreriaService.js";

export async function consultarDatosRecaudoUseCase() {
    const datosRecaudo = await tesoreriaService.consultarDatosRecaudo();
    return {
        status: "success",
        data: datosRecaudo,
    };
}