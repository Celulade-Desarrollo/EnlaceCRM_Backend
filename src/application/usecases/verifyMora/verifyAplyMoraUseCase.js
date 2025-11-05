import { VerifyMoraAdapter } from "../../../infrastructure/adapters/verifyMoraAdapter.js";

export async function validarMoraUseCase() {
  const verifyMoraAdapter = new VerifyMoraAdapter();

  const usuariosConPagosVencidos = await verifyMoraAdapter.obtenerUsuariosConPagosVencidos();
  const usuariosSinMoraPendiente = await verifyMoraAdapter.obtenerUsuariosSinMoraPendiente();
  const facturasAbonadas = await verifyMoraAdapter.obtenerUFacturasAbonadas();

  const facturasPagadasSet = new Set(
    facturasAbonadas.map(f => `${f.IdUsuarioFinal},${f.NroFacturaAlpina}`)
  );

  let totalMarcados = 0;
  let totalDesbloqueados = 0;

  for (const usuario of usuariosConPagosVencidos) {
    const key = `${usuario.id}_${usuario.NroFacturaAlpina}`;
    if (!facturasPagadasSet.has(key)) {
      try {
        await verifyMoraAdapter.marcarUsuarioEnMora(usuario.id, usuario.NroFacturaAlpina);
        console.log(`✅ Usuario ${usuario.id} marcado en mora (factura ${usuario.NroFacturaAlpina})`);
        totalMarcados++;
      } catch (err) {
        console.error(`❌ Error al marcar en mora al usuario ${usuario.id}:`, err.message);
      }
    }
  }
  for (const usuario of usuariosSinMoraPendiente) {
    try {
      await verifyMoraAdapter.quitarMoraSiPago(usuario.id);
      console.log(`🟢 Usuario ${usuario.id} ya pagó todo — mora eliminada`);
      totalDesbloqueados++;
    } catch (err) {
      console.error(`❌ Error al quitar mora al usuario ${usuario.id}:`, err.message);
    }
  }

  return { totalMarcados, totalDesbloqueados };
};