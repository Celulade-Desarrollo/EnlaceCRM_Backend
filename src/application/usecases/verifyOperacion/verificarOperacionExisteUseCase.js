import { VerifyOperacionAdapter } from "../../../infrastructure/adapters/verifyOperacionAdapter.js";

export async function verificarOperacionExisteUseCase(operacionId) {
  const adapter = new VerifyOperacionAdapter();
  return await adapter.existeOperacion(operacionId);
}