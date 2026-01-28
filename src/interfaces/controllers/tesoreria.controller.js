import { getRecaudoFromEstadoCuentaServiceUseCase } from "../../application/usecases/tesoreria/getRecaudoFromEstadoCuentaServiceUseCase.js";
import { crearRegistroTesoreriaUseCase } from "../../application/usecases/tesoreria/crearRegistroTesoreria.js";
import { actualizarDispersionUseCase } from "../../application/usecases/tesoreria/actualizarDispersionUseCase.js";
import { procesarYGuardarRecaudoUseCase } from "../../application/usecases/tesoreria/procesarYGuardarRecaudoUseCase.js";
import { consultarDatosRecaudoUseCase } from "../../application/usecases/tesoreria/consultarDatosRecaudoUseCase.js";
import { crearRegistroConDispersionUseCase } from "../../application/usecases/tesoreria/crearRegistroConDispersionUseCase.js";
import { consultarRegistrosSinDispersionUseCase } from "../../application/usecases/tesoreria/consultarRegistrosSinDispersionUseCase.js";

export async function getRecaudoFromEstadoCuentaServiceController(req, res){
    try {
        const recaudo =  await getRecaudoFromEstadoCuentaServiceUseCase();
        res.status(200).json(recaudo);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}

export async function crearRegistroTesoreriaController(req, res){
    try {
        const result = await crearRegistroTesoreriaUseCase();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}

export async function actualizarDispersionController(req, res){
    try {
        const data = req.body;
        const result = await actualizarDispersionUseCase(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}

export async function asignarDispersionAlpinaController(req, res){
    try {
        const { id } = req.params;
        const data = { id: parseInt(id), dispersion: "Alpina" };
        const result = await actualizarDispersionUseCase(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}

export async function asignarDispersionSurtialimentosController(req, res){
    try {
        const { id } = req.params;
        const data = { id: parseInt(id), dispersion: "Surtialimentos" };
        const result = await actualizarDispersionUseCase(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}

export async function procesarYGuardarRecaudoController(req, res){
    try {
        const result = await procesarYGuardarRecaudoUseCase();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}

export async function consultarDatosRecaudoController(req, res){
    try {
        const result = await consultarDatosRecaudoUseCase();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}

export async function crearRegistroConDispersionController(req, res){
    try {
        const dataArray = req.body;
        const result = await crearRegistroConDispersionUseCase(dataArray);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}

export async function consultarRegistrosSinDispersionController(req, res){
    try {
        const result = await consultarRegistrosSinDispersionUseCase();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}