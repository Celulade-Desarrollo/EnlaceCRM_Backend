import { cupoService } from "../../services/cupoService.js";

export async function updateCupoBanco(id, cupo) {
  return await cupoService.actualizarCupoPorId(id, cupo);
}