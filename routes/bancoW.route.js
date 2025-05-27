import express from "express";
import {
  getAllBancoW,
  getByFlujoIdBancoW,
  createBancoW,
  deleteBancoWbyId,
  createUserAccount,
  getUserAccountById,
} from "../controller/bancoW.controller.js";

const bancoW = express.Router();

// GET: Todos los registros
bancoW.get("/api/bancow", getAllBancoW);

// GET: Por IdFlujoRegistro de enlace
bancoW.get("/api/bancow/:id", getByFlujoIdBancoW);

// POST: Crear nuevo registro
bancoW.post("/api/bancow", createBancoW);

// DELETE: Eliminar registro por ID
bancoW.delete("/api/bancow/:id", deleteBancoWbyId);

bancoW.post("/api/bancow/user", createUserAccount);

// GET de userAccount por IdFlujoRegistro
bancoW.get("/api/bancow/user/:id", getUserAccountById);

export default bancoW;
