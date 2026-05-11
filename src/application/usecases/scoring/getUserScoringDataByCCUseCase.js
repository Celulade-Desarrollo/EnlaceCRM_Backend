import { scoringRepository } from "../../../infrastructure/repositories/scoring.repository.js";
import { UserScoringData } from "../../../domain/models/UserScoringData.js";

/**
 * Calcula la edad a partir de la fecha de nacimiento.
 * @param {string} fechaNacimiento 
 * @returns {number}
 */
function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return 0;
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

/**
 * Parsea el rango de ingresos a un número de ventas diarias (estimado).
 * @param {string} rango 
 * @returns {number}
 */
function parseVentasDiarias(rango) {
  if (!rango) return 0;
  // Ejemplo: "1.000.000" -> 1000000
  const valor = parseFloat(String(rango).replace(/\./g, "").replace(",", "."));
  return isNaN(valor) ? 0 : valor;
}

function parseCupo(cupo) {
  if (!cupo) return 0;
  // Ejemplo: "1.000.000" -> 1000000
  const valor = parseFloat(String(cupo).replace(/\./g, "").replace(",", "."));
  return isNaN(valor) ? 0 : valor;
}

export async function getUserScoringDataByCCUseCase(cedula, requestId = null) {
  const rawData = await scoringRepository.UserScoringDataByCC(cedula);

  if (!rawData) {
    throw new Error("No se encontró información de scoring para el cliente especificado.");
  }

  // Mapeo al DTO
  return new UserScoringData({
    request_id: requestId,
    client: {
      document_id: String(rawData.Cedula_Cliente),
      document_type: "CC",
      age: calcularEdad(rawData.Fecha_de_Nacimiento),
      city: rawData.Ubicacion_del_Negocio_Ciudad,
      neighborhood: rawData.Barrio,
      socioeconomic_level: parseInt(rawData.Estrato) || 0,
      legal_nature: "natural",
      geo: {
        x: parseFloat(rawData.Latitud) || 0,
        y: parseFloat(rawData.Longitud) || 0
      }
    },
    business: {
      monthly_sales: parseVentasDiarias(rawData.Rango_de_Ingresos),
      refrigerator_count: parseInt(rawData.Numero_de_neveras) || 0
    },
    credit_request: {
      requested_amount: parseCupo(rawData.Cupo),
      currency: "COP"
    },
    payment_behavior: {
      movements: rawData.movements.map(m => ({
        id: m.IdMovimiento,
        type: m.IdTipoMovimiento,
        amount: m.Monto,
        date: m.FechaHoraMovimiento,
        description: m.Descripcion
      }))
    },
    metadata: {
      source_system: "backend_core",
      scoring_version: "v2"
    }
  });
}
