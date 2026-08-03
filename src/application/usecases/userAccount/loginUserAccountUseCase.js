import { userAccountService } from "../../services/userAccountServiceInstance.js";
import { tokenVerifierService } from "../../services/TokenVerifierService.js";
import { tokenGeneratorService } from "../../services/TokenGeneratorService.js";
import { fetchNbCliente } from "../../services/fetchNbCliente.js";
import { alpinaService } from "../../services/alpinaServiceInstance.js";
import { AuthAlpinaAdapter } from "../../../infrastructure/adapters/AuthAlpinaAdapter.js";
import { fetchLoginAlpina } from "../../services/fetchAlpina.js";
import { LogsService } from "../../services/LogsService.js";
import { LOGS_TYPE } from "../../../constants/LogsType.js";

export async function loginUserAccountUseCase(
  nbCliente,
  nbAgenteComercial,
  token
) {
  
  const authAdapter = new AuthAlpinaAdapter();
  const bearerToken = await fetchLoginAlpina();

  // Obtiene todos los datos del cliente desde Banco W
  const datosCliente = await fetchNbCliente(
    nbCliente,
    nbAgenteComercial,
    bearerToken
  );

 if (!datosCliente) {
    const error = new Error(
      "No encontramos información para este cliente."
    );

    error.status = 404;
    error.payload = {
      message:
        "No encontramos información para este cliente. No es posible continuar con el registro.",
    };

    throw error;
  }

  const cedula = datosCliente.documento;

  const cuentaNbCliente = await userAccountService.verificarNbCliente(
    nbCliente
  );

  if (cuentaNbCliente) {
    if (
      cuentaNbCliente.Estado === "Asesor" ||
      cuentaNbCliente.Estado === "Incompleto" || 
      cuentaNbCliente.Estado === "IncompletoBloqCorreo" ||
      cuentaNbCliente.Estado === "IncompletoBloqCedula" ||
      cuentaNbCliente.Estado === "IncompletoBloqUbiNegocio" ||
      cuentaNbCliente.Estado === "IncompletoBloqInfoNegocio" ||
      cuentaNbCliente.Estado === "IncompletoBloqVentas" ||
      cuentaNbCliente.Estado === "IncompletoBloqInfoFinanciera"
      
    ) {
      const error = new Error("El usuario requiere asesoría.");
      error.status = 207;
      error.payload = {
        estado: cuentaNbCliente.Estado.trim(),
        nbCliente: cuentaNbCliente.nbCliente,
        nbAgenteComercial: cuentaNbCliente.nbAgenteComercial,
        Autorizacion_Habeas_Data:
          cuentaNbCliente.Autorizacion_Habeas_Data,
        Autorizacion_Medios_de_Contacto:
          cuentaNbCliente.Autorizacion_Medios_de_Contacto,
        Id: cuentaNbCliente.Id,
      };
      throw error;
    }

    const error = new Error("Ya existe una solicitud de cuenta en proceso.");
    error.status = 207;
    error.payload = {
      estado: cuentaNbCliente.Estado,
      confirmacionIdentidad: cuentaNbCliente.Confirmacion_Identidad,
    };
    throw error;
  }

  const cuenta = await userAccountService.validarCuentaCedula(cedula);

  // No existe cuenta -> enviar también los datos obtenidos de Banco W
  if (!cuenta) {
    const tokenTenderoEnlaceCRM =
      await tokenGeneratorService.generateToken({
        cedula,
      });

    const error = new Error(
      "No se encontró una cuenta creada para esta cédula."
    );

    error.status = 400;
    error.payload = {
      message: "No se encontró una cuenta creada para esta cédula.",
      token: tokenTenderoEnlaceCRM,

      cliente: {
        clienteId: datosCliente.clienteId,
        documento: datosCliente.documento,
        nombre: datosCliente.nombre,
        apellido: datosCliente.apellido,
        departamento: datosCliente.departamento,
        ciudad: datosCliente.ciudad,
      },
    };

    throw error;
  }

  if (
    cuenta.EstadoFlujo &&
    cuenta.EstadoFlujo.toLowerCase() === "negado"
  ) {
    const error = new Error(
      "El registro para esta cédula ha sido negado."
    );
    error.status = 403;
    throw error;
  }

  /*
  const Token = token;

  if (!Token) throw new Error("Falta parametro Token");

  const tokenValidation = await tokenVerifierService.verifyToken(token);

  if (!tokenValidation) {
    const error = new Error("Token no valido");
    error.status = 401;
    throw error;
  }
  */

  const tokenTenderoEnlaceCRM =
    await tokenGeneratorService.generateToken({
      cedula,
    });

  if (!tokenTenderoEnlaceCRM)
    throw new Error(
      "Falló la creación del token para el tendero"
    );

  console.log(cuenta);

  try {
    await LogsService.generarLog(
      cedula,
      "Usuario",
      LOGS_TYPE.LOGIN,
      new Date(),
      `El usuario con cédula ${cedula} ha iniciado sesión`
    );
  } catch (logError) {
    console.error(
      "Error registrando log de login de usuario",
      logError
    );
  }

  return {
    token: tokenTenderoEnlaceCRM,
    tipo: "usuario",
    state: "Authenticated",
    idUsuario: cuenta.IdUsuarioFinal,
    cuenta,
  };
}