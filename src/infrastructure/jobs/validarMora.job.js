import cron from "node-cron";
import { validarMoraUseCase } from "../../application/usecases/verifyMora/verifyAplyMoraUseCase.js";

cron.schedule("0 17 * * *", async () => {
  console.log("⏰ Ejecutando job de validación de mora...");

  try {
    const resultado = await validarMoraUseCase();
    console.log(`✅ Usuarios marcados en mora: ${resultado.totalMarcados}`);
  } catch (err) {
    console.error("❌ Error en job de validación de mora:", err.message);
  }
});