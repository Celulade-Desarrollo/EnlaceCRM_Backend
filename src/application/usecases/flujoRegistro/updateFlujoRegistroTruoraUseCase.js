import { flujoRegistroRepository } from "../../../infrastructure/repositories/flujoRegistro.repository.js";

const RANGO_INGRESOS_MAP = {
  "Menos de $200.000": 150000,
  "Entre $200.000 y $400.000": 300000,
  "Entre $400.000 y $600.000": 500000,
  "Entre $600.000 y $800.000": 700000,
  "Más de $800.000": 900000,
};

function parseBooleanLike(value) {
  if (typeof value === "boolean") return value;
  if (value === null || value === undefined) return null;
  const s = String(value).trim().toLowerCase();
  if (s === "no" || s === "n" || s === "false" || s === "0") return false;
  if (s === "si" || s === "sí" || s === "s" || s === "yes" || s === "1" || s === "true") return true;
  return null;
}

export const updateFlujoRegistroTruoraUseCase = async (id, data) => {
  if (!id) {
    throw new Error("El ID es requerido para actualizar el registro.");
  }

  // Clonar datos para normalizar sin mutar el original
  const normalized = { ...data };

  // Mapear Rango_de_Ingresos a valor numérico si viene en texto de Truora
  if (normalized.Rango_de_Ingresos) {
    const key = String(normalized.Rango_de_Ingresos).trim();
    if (Object.prototype.hasOwnProperty.call(RANGO_INGRESOS_MAP, key)) {
      normalized.Rango_de_Ingresos = String(RANGO_INGRESOS_MAP[key]);
    }
  }

  // Campos que Truora puede enviar como "No"/"Si" y que en la BD son bit
  const booleanFields = [
    "Registrado_Camara_Comercio",
    "Persona_expuesta_politicamente_PEP",
    "Familiar_expuesto_politicamente_PEP",
    "Operaciones_moneda_extranjera",
  ];

  for (const field of booleanFields) {
    if (field in normalized) {
      const parsed = parseBooleanLike(normalized[field]);
      if (parsed !== null) normalized[field] = parsed;
    }
  }

  await flujoRegistroRepository.actualizarRegistroTruora(id, normalized);

  return "Registro actualizado correctamente.";
};
