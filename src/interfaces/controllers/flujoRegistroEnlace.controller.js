import { getAllFlujoRegistro } from "../../application/usecases/flujoRegistro/getAllFlujoRegistroUseCase.js";
import { getFlujoRegistroById } from "../../application/usecases/flujoRegistro/getFlujoRegistroByIdUseCase.js";
import { getFlujoRegistroByEstado } from "../../application/usecases/flujoRegistro/getFlujoRegistroByEstadoUseCase.js";
import { getFlujoRegistroByAlpina } from "../../application/usecases/flujoRegistro/getFlujoRegistroByAlpinaUseCase.js";
import { getFlujoRegistroByNumeroCelular } from "../../application/usecases/flujoRegistro/getFlujoRegistroByNumeroCelularUseCase.js";
import { createFlujoRegistroUseCase } from "../../application/usecases/flujoRegistro/createFlujoRegistroUseCase.js";
import { deleteFlujoRegistroUseCase } from "../../application/usecases/flujoRegistro/DeleteFlujoRegistroUseCase.js";
import { updateEstadoFlujoRegistro } from "../../application/usecases/flujoRegistro/updateEstadoFlujoRegistroUseCase.js";
import { consultarCedulaUseCase } from "../../application/usecases/flujoRegistro/consultarCedulaUseCase.js";
import { updateClienteAcepto } from "../../application/usecases/flujoRegistro/updateClienteAproboUseCase.js";
import { consultarPorCedulaYNbClienteUseCase } from "../../application/usecases/flujoRegistro/consultarPorCedulaYNbClienteUseCase.js";
import { consultarEstadoCupoTodosUseCase } from "../../application/usecases/flujoRegistro/getAllEstadoCupoUseCase.js";

export const consultarPorCedulaYNbCliente = async (req, res) => {
  try {
    const {  nbCliente } = req.body;

    const resultado = await consultarPorCedulaYNbClienteUseCase(nbCliente);

    if (!resultado) {
      return res.status(404).json({ message: "No encontrado" });
    }

    res.status(200).json(resultado);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const consultarEstadoCupoTodos = async (req, res) => {
  try {
    const data = await consultarEstadoCupoTodosUseCase();
    res.json(data);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const data = await getAllFlujoRegistro();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export async function consultarCedula(req, res) {
  try {
    const data = await consultarCedulaUseCase(req.body.nbCliente, req.body.nbAgenteComercial);
    if (!data) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getById = async (req, res) => {
  try {
    const data = await getFlujoRegistroById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getByAlpina = async (req, res) => {
  try {
    const data = await getFlujoRegistroByAlpina(req.params.alpinaId);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getBynumber = async (req, res) => {
  try {
    const data = await getFlujoRegistroByNumeroCelular(req.params.Numero_Celular);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createRegistro = async (req, res) => {
  try {
    const result = await createFlujoRegistroUseCase(req.body);
    res.status(201).json({ message: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteById = async (req, res) => {
  try {
    await deleteFlujoRegistroUseCase(req.params.id);
    res.json({ message: "Registro eliminado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getByEstado = async (req, res) => {
  try {
    const result = await getFlujoRegistroByEstado();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No hay registros con estado pendiente o aprobado" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEstadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { Estado } = req.body;
    await updateEstadoFlujoRegistro(id, Estado);
    res.json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateClienteAceptoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { respuestaCliente } = req.body;
    await updateClienteAcepto(id, respuestaCliente);
    res.json({ message: "campo cliente acepto actualizado correctamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};