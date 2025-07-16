import { VerifyMoraAdapter } from "../../../infrastructure/adapters/verifyMoraAdapter.js";

export async function validarMoraUseCase() {
  const verifyMoraAdapter = new VerifyMoraAdapter();

  const usuariosConPagosVencidos = await verifyMoraAdapter.obtenerUsuariosConPagosVencidos();
  const facturasAbonadas = await verifyMoraAdapter.obtenerUFacturasAbonadas();

  // Set para busquedas rapidas de facturas pagadas por usuario
  const facturasPagadasSet = new Set(
    facturasAbonadas.map(f => `${f.IdUsuarioFinal},${f.NroFacturaAlpina}`)
  );

  let totalMarcados = 0;

  for (const usuario of usuariosConPagosVencidos) {
    const key = `${usuario.id}_${usuario.NroFacturaAlpina}`;
    // si la factura no está en la lista de facturas pagadas, marcar en mora
    if (!facturasPagadasSet.has(key)) {
      try {
        await verifyMoraAdapter.marcarUsuarioEnMora(usuario.id, usuario.NroFacturaAlpina);
        console.log(`✅ Usuario ${usuario.id} marcado en mora (factura ${usuario.NroFacturaAlpina})`);
        totalMarcados++;
      } catch (err) {
        console.error(`❌ Error al marcar en mora al usuario ${usuario.id}:`, err.message);
      }
    } else {
      console.log(` Usuario ${usuario.id} factura ${usuario.NroFacturaAlpina} ya abonada, no se marca en mora.`);
    }
  }

  return { totalMarcados };
}

