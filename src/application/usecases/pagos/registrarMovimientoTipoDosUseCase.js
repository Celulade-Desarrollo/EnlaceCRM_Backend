import {estadoCuentaService} from "../../services/estadoCuentaServiceInstance.js"

export async function registrarMovimientoTipoDosUseCase(IdMovimiento, monto, Intereses, Fees){

    const data = await estadoCuentaService.traerPorIdMovimiento(IdMovimiento);

   const nuevoMontoModificado = data.AbonoUsuario + monto 
   const nuevoInteresesModificado = data.Intereses + Intereses
   const nuevoFeesModificado = data.Fees + Fees

    const recorset =  await estadoCuentaService.registrarMovimientoAbono(IdMovimiento, nuevoMontoModificado, nuevoInteresesModificado, nuevoFeesModificado);
    return {
        status: "success",
        data: recorset
    }
} 