import cron from "node-cron";
import { procesarYGuardarRecaudoUseCase } from "../../application/usecases/tesoreria/procesarYGuardarRecaudoUseCase.js";

cron.schedule("0 0 * * *", async () => {
  console.log("⏰ Ejecutando job de procesamiento y guardado de recaudo....");

  try {
    const resultado = await procesarYGuardarRecaudoUseCase();
    console.log(`✅ Registros de recaudo procesados: ${resultado.message}`);
  } catch (err) {
    console.error("❌ Error en job de procesamiento de recaudo:", err.message);
  }
});