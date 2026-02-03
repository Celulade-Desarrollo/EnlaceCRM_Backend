import { flujoRegistroService } from "../../services/flujoRegistroServiceInstance.js";

export async function consultarPorCedulaYNbClienteUseCase(
  Cedula_Cliente,
  nbCliente
) {
  const registro =
    await flujoRegistroService.obtenerEstadoYCupo(
      Cedula_Cliente,
      nbCliente
    );

  if (!registro) {
    return {
      Cedula_Cliente,
      nbCliente,
      Estado: 0
    };
  }

  let estado = 0;
  let subEstado = null;
  let cupo = null;

  // BLOQUEO
  if (registro.BloqueoPorMora === 1) {
    estado = 4;
  }

  //APROBADO 
  else if (registro.CupoDisponible > 0) {
    estado = 3;
    cupo = calcularCupo(registro.CupoDisponible);
  }

  // en APROBACIÓN
 else {
  estado = 2;

  const scoring =
    await flujoRegistroService.obtenerScoringPorFlujo(
      registro.Id
    );

  //Subestado 1: Pendiente Enlace
  if (!scoring) {
    subEstado = "1 Pendiente Enlace";
  } else {
    const banco =
      await flujoRegistroService.obtenerBancoPorFlujo(
        registro.Id
      );

    const estadoScoring = scoring.Estado?.toLowerCase();

    // 🔹 Subestado 2: Pendiente Tendero
    if (
      estadoScoring !== "confirmado" &&
      (!banco || banco.Pagare_Digital_Firmado !== "si")
    ) {
      subEstado = "2 Pendiente Tendero";
    } else {
      // scoring confirmado, pero aún no hay usuario final
      subEstado = "1 Pendiente Enlace";
    }
  }
}

  const response = {
    Cedula_Cliente: registro.Cedula_Cliente,
    nbCliente: registro.nbCliente,
    Estado: estado
  };

  if (estado === 2) response.SubEstado = subEstado;
  if (estado === 3) response.Cupo = cupo;

  return response;
}



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