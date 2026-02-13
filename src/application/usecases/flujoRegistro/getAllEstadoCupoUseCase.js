import { flujoRegistroService } from "../../services/flujoRegistroServiceInstance.js";

function calcularCupo(valor) {
  if (valor >= 40000 && valor <= 50000) return 1;
  if (valor > 50000 && valor <= 100000) return 2;
  if (valor > 100000 && valor <= 150000) return 3;
  if (valor > 150000 && valor <= 200000) return 4;
  if (valor > 200000 && valor <= 300000) return 5;
  if (valor > 300000 && valor <= 400000) return 6;
  if (valor > 400000 && valor <= 500000) return 7;
  if (valor > 500000 && valor <= 750000) return 8;
  if (valor > 750000 && valor <= 1000000) return 9;
  if (valor > 1000000) return 10;
  return 0;
}

export async function consultarEstadoCupoTodosUseCase() {
  const registros = await flujoRegistroService.obtenerEstadoYCupoTodos();

  const response = [];

  for (const registro of registros) {
    
    let estado = 0;
    let subEstado = null;
    let cupo = null;

    if (registro.BloqueoPorMora === true) {
      estado = 4;
    } else if (registro.CupoDisponible > 0) {
      estado = 3;
      cupo = calcularCupo(registro.CupoDisponible);
    } else {
      estado = 2;

      const scoring =
        await flujoRegistroService.obtenerScoringPorFlujo(registro.Id);

      if (!scoring) {
        subEstado = "1 Pendiente Enlace";
      } else {
        const banco =
          await flujoRegistroService.obtenerBancoPorFlujo(registro.Id);

        const estadoScoring = scoring.Estado?.toLowerCase();

        if (
          estadoScoring !== "confirmado" &&
          (!banco || banco.Pagare_Digital_Firmado !== "si")
        ) {
          subEstado = "2 Pendiente Tendero";
        } else if (
          estadoScoring === "confirmado" &&
          (!banco || banco.Pagare_Digital_Firmado !== "si")
        ) {
          subEstado = "2 Pendiente Tendero";
        } else {
          subEstado = "1 Pendiente Enlace";
        }
      }
    }

    const item = {
      nbCliente: registro.nbCliente,
      nombreTienda: registro.Nombre_Tienda,
      Nombres: registro.Nombres,
      Primer_Apellido: registro.Primer_Apellido,
      Segundo_Apellido_opcional: registro["2do_Apellido_opcional"],
      Estado: estado
    };

    if (estado === 2) item.SubEstado = subEstado;
    if (estado === 3) item.Cupo = cupo;

    response.push(item);
  }

  return response;
};