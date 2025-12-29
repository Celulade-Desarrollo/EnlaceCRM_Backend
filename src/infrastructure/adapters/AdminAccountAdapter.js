import { AdminAccountPort } from "../../domain/ports/AdminAccountPort.js";
import { adminAccountRepository } from "../repositories/adminAccount.repository.js";

export class AdminAccountAdapter extends AdminAccountPort{
    async validarCuentaCedula(cedula){
        return await adminAccountRepository.validarCuentaCedula(cedula)
    }

    async obtenerTodos(){
        return await adminAccountRepository.obtenerTodos()
    }

    async crearCuenaAdmin(input){
        return await adminAccountRepository.crearCuentaAdmin(input)
    }

    async actualizarContrasena(id, nuevaContrasena){
        return await adminAccountRepository.actualizarContrasena(id, nuevaContrasena)
    }
}
