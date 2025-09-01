import { getAllBancow } from "../../application/usecases/bancow/getAllBancow.UseCase.js";
import { getBancowByIdFlujoRegistro } from "../../application/usecases/bancow/getBancowByIdFlujoRegistroUseCase.js";
import { createRegistroBancowUseCase } from "../../application/usecases/bancow/createRegistroBancowUseCase.js";
import { deleteRegistroBancowUseCase } from "../../application/usecases/bancow/deleteRegistroBancowUseCase.js";
import { updateCoreBancarioUseCase } from "../../application/usecases/bancow/updateCoreBancarioUseCase.js";
import { getExcelData } from "../../application/usecases/bancow/getExcelDataUseCase.js";

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
  const {
    IdFlujoRegistro,
    Validacion_Banco_listas,
    Aprobacion_Cupo_sugerido,
    Pagare_Digital_Firmado,
    Pagare_Digital_Enviado,
    UsuarioAprobado
  } = req.body;

  try {
    // Convertir IdFlujoRegistro a número
    const idFlujoRegistroNum = parseInt(IdFlujoRegistro);
    if (isNaN(idFlujoRegistroNum)) {
      return res.status(400).json({ error: "IdFlujoRegistro debe ser un número válido" });
    }

    const result = await createRegistroBancowUseCase({
      IdFlujoRegistro: idFlujoRegistroNum,
      Validacion_Banco_listas,
      Aprobacion_Cupo_sugerido,
      Pagare_Digital_Firmado,
      Pagare_Digital_Enviado,
      UsuarioAprobado,
    });
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
    const { Pagare_Digital_Firmado, Pagare_Digital_Enviado, UsuarioAprobado } = req.body;
    
    //  if (Pagare_Digital_Firmado || Pagare_Digital_Enviado || UsuarioAprobado) {
    //    return res.status(400).json({
    //      error: "Faltan campos requeridos: Pagare_Digital_Firmado, Pagare_Digital_Enviado, UsuarioAprobado" 
    //    });
    //  }

    await updateCoreBancarioUseCase(id, {
      Pagare_Digital_Firmado,
      Pagare_Digital_Enviado,
      UsuarioAprobado
    });
    
    res.status(200).json({ message: "Registro actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getExcel = async (req, res) => {
  try {
    const data = await getExcelData();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

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
  updateCoreBancario,
  getExcel

};
