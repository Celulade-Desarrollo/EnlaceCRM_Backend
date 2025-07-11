import { AlpinaDatosPort } from "../../domain/ports/AlpinaDatosPort.js";
import { alpinaRepository } from "../repositories/alpina.repository.js";
import { logger } from "../../config/logger.js";
import ValidationError from "../../errors/Validation.error.js";

export class AlpinaDatosAdapter extends AlpinaDatosPort {
  async obtenerDatosClienteYAgente(identificadorTendero) {
    try {
      logger.info('[AlpinaDatosAdapter] Consultando datos para cédula:', identificadorTendero);

      const datos = await alpinaRepository.obtenerDatosClienteYAgente(identificadorTendero);

      logger.info('[AlpinaDatosAdapter] Datos obtenidos del repositorio', datos);

      if (!datos || !datos.nbCliente || !datos.nbAgenteComercial) {
        logger.warn(`[AlpinaDatosAdapter] Datos incompletos para tendero ${identificadorTendero}:`, datos);
        throw new ValidationError("Datos incompletos: el cliente o el agente comercial están vacíos en la base de datos");
      }

      return datos;

    } catch (error) {
      logger.error("[AlpinaDatosAdapter] Error al obtener datos del cliente y agente comercial:", {
        mensaje: error.message,
        stack: error.stack
      });

      if (error instanceof ValidationError) {
        throw error;
      }

      throw new Error("No se pudieron obtener los datos del cliente y agente comercial.");
    }
  }
}


// import { AlpinaDatosPort } from "../../domain/ports/AlpinaDatosPort.js";
// import { alpinaRepository } from "../repositories/alpina.repository.js";
// import { logger } from "../../config/logger.js";
// import ValidationError from "../../errors/Validation.error.js";  // ← Ruta corregida

// export class AlpinaDatosAdapter extends AlpinaDatosPort {
//   async obtenerDatosClienteYAgente(identificadorTendero) {
//     try {
//       const datos = await alpinaRepository.obtenerDatosClienteYAgente(identificadorTendero);

//       if (!datos || !datos.nbCliente || !datos.nbAgenteComercial) {
//         logger.warn(`Datos incompletos para tendero ${identificadorTendero}:`, datos);
//         throw new ValidationError("Datos incompletos: el cliente o el agente comercial están vacíos en la base de datos");
//       }

//       return datos;

//     } catch (error) {
//       logger.error("Error en AlpinaDatosAdapter:", {
//         mensaje: error.message,
//         stack: error.stack
//       });

//       if (error instanceof ValidationError) {
//         throw error;
//       }

//       throw new Error("No se pudieron obtener los datos del cliente y agente comercial.");
//     }
//   }
// }
