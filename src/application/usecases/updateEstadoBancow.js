import { bancowService } from "../services/bancowServiceInstance";

export async function updateEstadoBancow(id, estado) {
    await bancowService.updateEstadoBancow()
}