import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const xlsx = require('xlsx');

import * as repo from '../../infrastructure/repositories/utilizacion.repository.js';

export const subirInteresesBanco = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No se seleccionó ningún archivo" });

        const workbook = xlsx.readFile(req.file.path, { cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        await repo.guardarDatosBanco(data);

        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);

        res.status(200).json({ message: "Intereses y Fees cargados correctamente ✅" });
    } catch (error) {
        console.error("Error en subirInteresesBanco:", error);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: "Error al procesar el Excel: " + error.message });
    }
};

export const descargarInteresesAdmin = async (req, res) => {
    try {
        const data = await repo.obtenerTodoParaAdmin();
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "No hay datos para descargar" });
        }


        const ws = xlsx.utils.json_to_sheet(data);


        const wscols = Object.keys(data[0]).map(() => ({ wch: 20 }));
        ws['!cols'] = wscols;


        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Intereses");

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=Reporte_Intereses_Banco.xlsx');

        res.end(buffer);
    } catch (error) {
        console.error("Error en descargarInteresesAdmin:", error);
        res.status(500).json({ error: "No se pudo generar el archivo de descarga" });
    }
};