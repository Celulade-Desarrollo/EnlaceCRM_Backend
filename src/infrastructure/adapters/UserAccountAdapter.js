import { UserAccountPort } from "../../domain/ports/UserAccountPort";
import { userAccountRepository } from "../repositories/userAccount.repository";

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

    /*
        // Pendiente el hasheo y JWT 
    
        async actualizarContrsasena(number, password) {
            return await userAccountRepository.actualizarContrsasena(number, password)
        }
    */

    // Verificación de JWT 
    async verificarToken(token, clave) {

    }


}