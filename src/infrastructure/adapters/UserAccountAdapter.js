import { UserAccountPort } from "../../domain/ports/UserAccountPort.js";
import { userAccountRepository } from "../repositories/userAccount.repository.js";
import jwt from "jsonwebtoken";

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
    async verificarToken(token, secret) {
        if (!token || !secret) {
            throw new Error('Token y secret son requeridos para la verificación');
        }

        try {
            const decoded = jwt.verify(token, secret);
            return {
                isValid: true,
                decoded
            };
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('El token ha expirado');
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('Token inválido');
            }
            throw new Error(`Error al verificar el token: ${error.message}`);
        }
    }
}

// exp  y quien lo emite ISS