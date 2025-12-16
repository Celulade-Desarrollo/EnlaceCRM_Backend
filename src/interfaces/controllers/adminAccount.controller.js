import { createAdminAccountUseCase } from "../../application/usecases/adminAccount/createAdminAccountUseCase.js";
import { getAllAdminAccountUseCase } from "../../application/usecases/adminAccount/getAllAdminAccountUseCase.js";
import { updateContrasena } from "../../application/usecases/adminAccount/updateContrasena.js";

export async function createUserAccount(req, res) {
    try {
      const result = await createAdminAccountUseCase(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

export async function obtenerTodosAdmin(req, res){
    try {
        const adminData = await getAllAdminAccountUseCase()
        res.status(200).json(adminData)
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}


export async function updateContrasenaController(req, res){

    const {id, nuevaContrasena} = req.body
    try {
        const adminData = await updateContrasena(id, nuevaContrasena)
        res.status(200).json(adminData)
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
}
