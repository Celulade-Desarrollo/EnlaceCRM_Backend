import { poolPromise } from '../persistence/database.js';
import sql from 'mssql';
import { logger } from '../../config/logger.js';

export const alpinaRepository = {
  async obtenerDatosClienteYAgente(cedula) {
    const pool = await poolPromise;

    const query = `
      SELECT
        f.nbCliente,
        f.nbAgenteComercial
      FROM EnlaceCRM.dbo.UsuarioFinal u
      JOIN EnlaceCRM.dbo.FlujosRegistroEnlace f ON u.IdFlujoRegistro = f.Id
      WHERE u.Cedula_Usuario = @cedula
    `;

    // Log con el query y parámetros correctos
    logger.info('Consulta SQL a ejecutar para obtener cliente y agente Alpina:', {
      query,
      params: { cedula }
    });

    const result = await pool.request()
      .input('cedula', sql.VarChar, cedula)
      .query(query);

    if (!result.recordset.length) {
      throw new Error('No se encontraron datos del cliente ni del agente para la cédula proporcionada');
    }

    const { nbCliente, nbAgenteComercial } = result.recordset[0];

    if (!nbCliente || !nbAgenteComercial) {
      throw new Error('Datos incompletos: el cliente o el agente comercial están vacíos en la base de datos');
    }

    return { nbCliente, nbAgenteComercial };
  }
};


// import { poolPromise } from '../persistence/database.js';
// import sql from 'mssql';
// import { logger } from '../../config/logger.js';

// export const alpinaRepository = {
//   async obtenerDatosClienteYAgente(cedula) {
//     const pool = await poolPromise;

//     const query = `
//       SELECT
//         f.nbCliente,
//         f.nbAgenteComercial
//       FROM EnlaceCRM.dbo.UsuarioFinal u
//       JOIN EnlaceCRM.dbo.FlujosRegistroEnlace f ON u.IdFlujoRegistro = f.Id
//       WHERE u.Cedula_Usuario = @cedula
//     `;
    
//     // Log con el query y parámetros
//     logger.info('Consulta SQL a ejecutar para obtener cliente y agente Alpina:', {
//         query,
//         params: { identificadorTendero }
//     });

//     const result = await pool.request()
//       .input('cedula', sql.VarChar, cedula)
//       .query(query);

//     if (!result.recordset.length) {
//       throw new Error('No se encontraron datos del cliente ni del agente para la cédula proporcionada');
//     }

//     const { nbCliente, nbAgenteComercial } = result.recordset[0];

//     if (!nbCliente || !nbAgenteComercial) {
//       throw new Error('Datos incompletos: el cliente o el agente comercial están vacíos en la base de datos');
//     }

//     return { nbCliente, nbAgenteComercial };
//   }
// };
