import express from 'express';
const router = express.Router();

import * as controller from '../controllers/utilizacion.controller.js'; 
import upload from '../middleware/multer.js';
import { authMiddleware } from "../middleware/token-middleware.js";

router.post('/subir-banco', authMiddleware, upload.single('file'), controller.subirInteresesBanco);
router.get('/descargar-admin', authMiddleware, controller.descargarInteresesAdmin);

export default router;