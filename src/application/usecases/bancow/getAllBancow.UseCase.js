import { bancowService } from "../../services/bancowServiceInstance.js";

export async function getAllBancow() {
    return await bancowService.obtenerTodos()
}