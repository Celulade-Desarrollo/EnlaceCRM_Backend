import { createFlujoRegistroUseCase } from "./createFlujoRegistroUseCase.js";
import { getAllFlujoRegistro } from "./getAllFlujoRegistroUseCase.js";
import { getFlujoRegistroById } from "./getFlujoRegistroByIdUseCase.js";
import { getFlujoRegistroByEstado } from "./getFlujoRegistroByEstadoUseCase.js";
import { getFlujoRegistroByAlpina } from "./getFlujoRegistroByAlpinaUseCase.js";
import { getFlujoRegistroByNumeroCelular } from "./getFlujoRegistroByNumeroCelularUseCase.js";
import { updateEstadoFlujoRegistro } from "./updateEstadoFlujoRegistroUseCase.js";
import { deleteFlujoRegistroUseCase } from "./DeleteFlujoRegistroUseCase.js";

export {
  // nombres que espera el controlador
  createFlujoRegistroUseCase as createFlujoRegistro,
  getAllFlujoRegistro as getAllRegistros,
  getFlujoRegistroById as getRegistroById,
  getFlujoRegistroByEstado as getRegistroByEstado,
  getFlujoRegistroByAlpina as getRegistroByAlpina,
  getFlujoRegistroByNumeroCelular as getRegistroByNumeroCelular,
  updateEstadoFlujoRegistro as updateEstadoRegistro,
  deleteFlujoRegistroUseCase as deleteRegistroById,
};
