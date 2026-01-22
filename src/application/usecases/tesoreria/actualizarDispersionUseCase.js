import { tesoreriaService } from "../../services/TesoreriaService.js";
import { DISPERSION_ALPINA, DISPERSION_SURTIAMENTOS } from "../../../constants/tesoreria.constants.js";

export async function actualizarDispersionUseCase(data) {
    const { id, dispersion } = data;

    if (!id || !dispersion) {
        throw new Error("ID y dispersión son requeridos");
    }

    const dispersionesValidas = [DISPERSION_ALPINA, DISPERSION_SURTIAMENTOS];
    if (!dispersionesValidas.includes(dispersion)) {
        throw new Error("Dispersión inválida. Use 'Alpina' o 'Surtialimentos'");
    }

    const result = await tesoreriaService.actualizarDispersion(id, dispersion);
    if (!result) throw new Error("Error al actualizar la dispersión");

    // Actualizar tesoreria_status a true
    const resultStatus = await tesoreriaService.actualizarEstadoTesoreria(id, true);
    if (!resultStatus) throw new Error("Error al actualizar el estado de tesorería");

    return {
        status: "success",
        message: "Dispersión actualizada exitosamente",
    };
}