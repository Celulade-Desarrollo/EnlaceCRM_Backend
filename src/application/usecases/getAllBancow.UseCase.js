import { bancowService } from "../services/bancowServiceInstance";

export async function getAllBancow() {
    return await bancowService.obtenerTodos()
}