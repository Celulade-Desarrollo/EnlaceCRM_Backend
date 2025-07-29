import { UserAccountPort } from "../../domain/ports/UserAccountPort.js";
import { userAccountRepository } from "../repositories/userAccount.repository.js";

export class UserAccountAdapter extends UserAccountPort {

    async obtenerTodos() {
        return await userAccountRepository.obtenerTodos()
    }

    async obtenerPorIdFlujoRegistro(id) {
        return await userAccountRepository.obtenerPorIdFlujoRegistro(id)
    }

    async verificarDuplicados(id) {
        return await userAccountRepository.verificarDuplicados(id)
    }

    async crearCuenta(input) {
        return await userAccountRepository.crearRegistro(input)
    }

    async eliminarPorIdFlujoRegistro(id) {
        return await userAccountRepository.eliminarPorIdFlujoRegistro(id)
    }
    async validarCuentaCedula(cedula){
        return await userAccountRepository.validarCuentaCedula(cedula)
     }

     async traerSaldo(idUsuario){
        return await userAccountRepository.traerSaldo(idUsuario)
    }

    async verificarNbCliente(nbCliente){
        return await userAccountRepository.verificarNbCliente(nbCliente)
    }
    
}
