import express from 'express';
import { consultarNombreCliente } from '../controllers/alpina.controller.js';

const router = express.Router();

router.post('/consultar-nombre', consultarNombreCliente);

export default router;