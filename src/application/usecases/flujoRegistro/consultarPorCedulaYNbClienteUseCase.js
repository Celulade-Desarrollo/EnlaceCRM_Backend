import { flujoRegistroService } from "../../services/flujoRegistroServiceInstance.js";

export async function consultarPorCedulaYNbClienteUseCase(Cedula_Cliente, nbCliente) {

  const registro = await flujoRegistroService.obtenerPorCedulaYNbCliente(Cedula_Cliente, nbCliente);

  if (!registro) return null;

  let estado = 0, subEstado = null, cupo = null;

  switch (registro.Estado?.toLowerCase()) {
    case "pendiente":
      estado = 2;
      subEstado = "1 Pendiente Enlace"; // o "2 Pendiente Tendero" si tienes ese dato
      break;
    case "aprobado":
      estado = 3;
      cupo = mapCupo(registro.Rango_de_Ingresos);
      break;
    case "bloqueo":
      estado = 4;
      break;
    case "no aprobado":
      estado = 1;
      break;
    default:
      estado = 0;
  }

  const resultado = {
    Cedula_Cliente: registro.Cedula_Cliente,
    nbCliente: registro.nbCliente,
    Estado: estado,
  };

  if (estado === 2) resultado.SubEstado = subEstado;
  if (estado === 3) resultado.Cupo = cupo;

  return resultado;
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