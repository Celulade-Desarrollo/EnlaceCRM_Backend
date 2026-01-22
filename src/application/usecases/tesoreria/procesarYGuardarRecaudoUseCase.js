import { tesoreriaService } from "../../services/TesoreriaService.js";

export async function procesarYGuardarRecaudoUseCase() {
    const registrosGuardados = await tesoreriaService.procesarYGuardarRecaudo();
    return {
        status: "success",
        message: `Se procesaron y guardaron ${registrosGuardados} registros de recaudo únicos por fecha.`,
    };
}