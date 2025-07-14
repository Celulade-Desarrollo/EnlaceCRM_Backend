import { VerifyMoraAdapter } from "../../../infrastructure/adapters/verifyMoraAdapter.js";

export async function validarMoraUseCase() {
  const verifyMoraAdapter = new VerifyMoraAdapter();

  const usuariosEnMora = await verifyMoraAdapter.obtenerUsuariosConPagosVencidos();

  for (const usuario of usuariosEnMora) {
    const { id, NroFacturaAlpina } = usuario;

    try {
      await verifyMoraAdapter.marcarUsuarioEnMora(id, NroFacturaAlpina);
      console.log(`✅ Usuario ${id} marcado en mora (factura ${NroFacturaAlpina})`);
    } catch (err) {
      console.error(`❌ Error al marcar en mora al usuario ${id}:`, err.message);
    }
  }

  return { totalMarcados: usuariosEnMora.length };
}
