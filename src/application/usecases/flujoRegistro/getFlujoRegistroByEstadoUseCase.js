import { flujoRegistroRepository } from "../../../infrastructure/repositories/flujoRegistro.repository.js";

export async function getFlujoRegistroByEstado() {
  const estados = ["pendiente", "aprobado"];
  const resultados = await Promise.all(
    estados.map(estado => flujoRegistroRepository.obtenerPorEstado(estado))
  );
  return resultados.flat();
}
