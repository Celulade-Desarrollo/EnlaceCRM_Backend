import express from 'express';
import { obtenerAsesorias } from '../controllers/asesoria.controller.js';

const router = express.Router();

router.get('/pendientes', obtenerAsesorias);

export default router;