// routes/flujoRegistroEnlace.routes.js
import express from "express";
const flujoRegistroEnlace = express.Router();

// Controladores
import {
  getAll,
  getById,
  getByAlpina,
  createRegistro,
  deleteById,
  getBynumber,
  getByEstado,
  updateEstadoById,
} from "../controller/flujoRegistroEnlace.controller.js";
import { buscarUsuarioPorTelefono } from "../middleware/phone_middleware.js";

import { sendOTP, verifyOTP } from "../controller/tiwilio.controller.js";

flujoRegistroEnlace.post("/api/twilio/send", buscarUsuarioPorTelefono, sendOTP);
flujoRegistroEnlace.post("/api/twilio/verify", verifyOTP);

// POST para crear un nuevo registro
flujoRegistroEnlace.post("/api/flujoRegistroEnlace", createRegistro);

// GET todos los registros
flujoRegistroEnlace.get("/api/flujoRegistroEnlace", getAll);

// GET por estado

flujoRegistroEnlace.get(
  "/api/flujoRegistroEnlace/estado/pendiente",
  getByEstado
);

// PUT para confirmar estado a completado
flujoRegistroEnlace.put(
  "/api/flujoRegistroEnlace/estado/pendiente/:id",
  updateEstadoById
);

// GET por ID
flujoRegistroEnlace.get("/api/flujoRegistroEnlace/:id", getById);

// GET por ID de Alpina
flujoRegistroEnlace.get(
  "/api/flujoRegistroEnlace/alpina/:alpinaId",
  getByAlpina
);

// DELETE por ID
flujoRegistroEnlace.delete("/api/flujoRegistroEnlace/:id", deleteById);

// GET por número de celular
flujoRegistroEnlace.get(
  "/api/flujoRegistroEnlace/num/:Numero_Celular",
  getBynumber
);

export default flujoRegistroEnlace;
