import { tesoreriaService } from "../../services/TesoreriaService.js";

export async function consultarRegistrosSinDispersionUseCase() {
    const registros = await tesoreriaService.consultarRegistrosSinDispersion();
    return {
        status: "success",
        data: registros,
    };
}