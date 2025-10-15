import {estadoCuentaService} from "../../services/estadoCuentaServiceInstance.js"

export async function registrarMovimientoTipoDosUseCase(IdMovimiento, monto){

    const data = await estadoCuentaService.traerPorIdMovimiento(IdMovimiento);

   const nuevoMontoModificado = data.AbonoUsuario + monto 

    const recorset =  await estadoCuentaService.registrarMovimientoAbono(IdMovimiento, nuevoMontoModificado);
    return {
        status: "success",
        data: recorset
    }
} 