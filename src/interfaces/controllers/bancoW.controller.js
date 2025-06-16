import { getAllBancow } from "../../application/usecases/bancow/getAllBancow.UseCase.js";
import { getBancowByIdFlujoRegistro } from "../../application/usecases/bancow/getBancowByIdFlujoRegistroUseCase.js";
import { createRegistroBancowUseCase } from "../../application/usecases/bancow/createRegistroBancowUseCase.js";
import { deleteRegistroBancowUseCase } from "../../application/usecases/bancow/deleteRegistroBancowUseCase.js";
import { updateCoreBancarioUseCase } from "../../application/usecases/bancow/updateCoreBancarioUseCase.js";

// GET: Todos los registros
const getAllBancoW = async (req, res) => {
  try {
    const data = await getAllBancow();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET: Por IdFlujoRegistro de enlace
const getByFlujoIdBancoW = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getBancowByIdFlujoRegistro(id);
    if (!data) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST: Crear nuevo registro
const createBancoW = async (req, res) => {
  try {
    const result = await createRegistroBancowUseCase(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteBancoWbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteRegistroBancowUseCase(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateCoreBancario = async (req, res) => {
  try {
    const { id } = req.params;
    const { Pagare_Digital_Firmado, Creacion_Core_Bancario, UsuarioAprobado } = req.body;
    
    if (!Pagare_Digital_Firmado || !Creacion_Core_Bancario || !UsuarioAprobado) {
      return res.status(400).json({ 
        error: "Faltan campos requeridos: Pagare_Digital_Firmado, Creacion_Core_Bancario, UsuarioAprobado" 
      });
    }

    await updateCoreBancarioUseCase(id, {
      Pagare_Digital_Firmado,
      Creacion_Core_Bancario,
      UsuarioAprobado
    });
    
    res.status(200).json({ message: "Registro actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/*

// POST para crear usuario final en dashboard
const createUserAccount = async (req, res) => {
  try {
    const result = await createUserAccountUseCase(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET Obtener el usuario final por IdFlujoRegistro
const getUserAccountById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getUserAccountByIdFlujoRegistro(id);
    if (!data) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

*/

export {
  getAllBancoW,
  getByFlujoIdBancoW,
  createBancoW,
  deleteBancoWbyId,
  updateCoreBancario

};
