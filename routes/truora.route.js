import express from "express";
const truora = express.Router();

// Controladores
import { truoraInfo } from "../controller/truora.controller";

truora.get("/api/truora", truoraInfo);

export default truora;
