import { dispersionService } from "../../services/dispersionService.js";

export async function listarDispersiones() {
    return await dispersionService.obtenerDispersiones();
}
