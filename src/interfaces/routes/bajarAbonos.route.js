import express from "express";
import { getExcel } from "../controllers/bajarAbono.controller.js";
import { authMiddleware } from "../middleware/token-middleware.js";

const bajarAbonos = express.Router();

bajarAbonos.get("/api/bajarAbonos", authMiddleware, getExcel);

export default bajarAbonos;