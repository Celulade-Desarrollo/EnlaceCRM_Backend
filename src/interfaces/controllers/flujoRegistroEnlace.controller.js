import {
  getAllRegistros,
  getRegistroById,
  getRegistroByEstado,
  getRegistroByAlpina,
  getRegistroByNumeroCelular,
  createFlujoRegistro,
  deleteRegistroById,
  updateEstadoRegistro,
} from "../../application/usecases/flujoRegistro.usecase.js";

export const getAll = async (req, res) => {
  try {
    const data = await getAllRegistros();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getById = async (req, res) => {
  try {
    const data = await getRegistroById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getByAlpina = async (req, res) => {
  try {
    const data = await getRegistroByAlpina(req.params.alpinaId);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getBynumber = async (req, res) => {
  try {
    const data = await getRegistroByNumeroCelular(req.params.Numero_Celular);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createRegistro = async (req, res) => {
  try {
    const result = await createFlujoRegistro(req.body); // ✅ nombre correcto del caso de uso
    res.status(201).json({ message: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteById = async (req, res) => {
  try {
    await deleteRegistroById(req.params.id); // ✅ nombre correcto del caso de uso
    res.json({ message: "Registro eliminado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getByEstado = async (req, res) => {
  try {
    const result = await getRegistroByEstado(req.query.estado || "pendiente");
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No hay registros con ese estado" });
    }
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateEstadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { Estado } = req.body;
    await updateEstadoRegistro(id, Estado); // ✅ nombre correcto del caso de uso
    res.json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
