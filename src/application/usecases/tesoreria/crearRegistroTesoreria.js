import { tesoreriaService } from "../../services/TesoreriaService.js";
import { Tesoreria } from "../../../domain/models/Tesoreria.js";
import { getRecaudoFromEstadoCuentaServiceUseCase } from "./getRecaudoFromEstadoCuentaServiceUseCase.js";

export async function crearRegistroTesoreriaUseCase(){

    const fetchTesoreriaData = await getRecaudoFromEstadoCuentaServiceUseCase();
    const tesoreriaObject = fetchTesoreriaData.map(object =>  new Tesoreria(object));

   
    const filteredTesoreriaObject = [];
    for (const obj of tesoreriaObject) {
        const fechaNormalizada = new Date(obj.fecha.getFullYear(), obj.fecha.getMonth(), obj.fecha.getDate());
        const existe = await tesoreriaService.existeRegistroPorFecha(fechaNormalizada);
        if (!existe) {
            filteredTesoreriaObject.push(obj);
        }
    }

    if (filteredTesoreriaObject.length === 0) {
        return {
            status: "success",
            message: "No se crearon registros nuevos, todos ya existen para las fechas especificadas",
        };
    }

    const result  = await tesoreriaService.crearRegistroEnTesoreria(filteredTesoreriaObject);
    if(!result) throw new Error("Error al crear el registro en tesoreria");

    return{
        status: "success",
        message: `Registro en tesoreria creado exitosamente para ${filteredTesoreriaObject.length} entradas`,
    }
}