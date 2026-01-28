import { tesoreriaService } from "../../services/TesoreriaService.js";
import { Tesoreria } from "../../../domain/models/Tesoreria.js";
import { DISPERSION_ALPINA, DISPERSION_SURTIAMENTOS } from "../../../constants/tesoreria.constants.js";

export async function crearRegistroConDispersionUseCase(dataArray) {
    const dispersionesValidas = [DISPERSION_ALPINA, DISPERSION_SURTIAMENTOS];
    const registrosCreados = [];

    for (const item of dataArray) {
        const { fecha, recaudo, dispersion } = item;

        // Validar dispersion
        if (!dispersionesValidas.includes(dispersion)) {
            throw new Error(`Dispersión inválida para fecha ${fecha}: ${dispersion}`);
        }

        // Convertir fecha a Date y normalizar
        const fechaDate = new Date(fecha);
        const fechaNormalizada = new Date(fechaDate.getFullYear(), fechaDate.getMonth(), fechaDate.getDate());

        // Verificar que no exista en Tesoreria
        const existeEnTesoreria = await tesoreriaService.existeRegistroPorFecha(fechaNormalizada);
        if (existeEnTesoreria) {
            throw new Error(`Ya existe un registro en Tesoreria para la fecha ${fecha}`);
        }

        // Crear objeto Tesoreria
        const tesoreriaObj = new Tesoreria({
            fecha: fechaDate,
            recaudo: parseInt(recaudo),
            dispersion: dispersion,
            tesoreria_status: true
        });

        // Guardar en Tesoreria
        await tesoreriaService.crearRegistroEnTesoreria([tesoreriaObj]);

        // Actualizar status en Recaudo
        await tesoreriaService.actualizarStatusRecaudo(fechaNormalizada);

        registrosCreados.push({ fecha, recaudo, dispersion });
    }

    return {
        status: "success",
        message: `Se crearon ${registrosCreados.length} registros en tesorería con dispersión.`,
        registros: registrosCreados
    };
}