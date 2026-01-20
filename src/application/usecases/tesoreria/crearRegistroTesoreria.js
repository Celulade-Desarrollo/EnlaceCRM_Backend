import { tesoreriaService } from "../../services/TesoreriaService";
import { Tesoreria } from "../../../domain/models/Tesoreria";

export async function crearRegistroTesoreriaUseCase(data){
    const nuevoRegistro = new Tesoreria(data);

    const result  = await tesoreriaService.crearRegistroEnTesoreria(nuevoRegistro);
    if(!result) throw new Error("Error al crear el registro en tesoreria");

    return{
        status: "success",
        message: "Registro en tesoreria creado exitosamente",
    }
}