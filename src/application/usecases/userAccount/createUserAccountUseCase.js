import { userAccountService } from "../../services/userAccountServiceInstance.js";
import { UserAccount } from "../../../domain/models/UserAccount.js";

export async function createUserAccountUseCase(input) {

    const cuenta = new UserAccount(input)

    // Validaciones 
    cuenta.ValidarDatos()

    if (!input || !input.IdFlujoRegistro || !input.CupoFinal || !input.Numero_Cliente || !input.Cedula_Usuario || !input.CupoDisponible) {
        throw new Error("Faltan campos requeridos: IdFlujoRegistro, CupoFinal, Numero_Cliente, Cedula_Usuario, CupoDisponible");
    }

    const duplicado = await userAccountService.verificarDuplicados(cuenta.IdFlujoRegistro)
    if (duplicado) {
        throw new Error("Ya existe una cuenta con este mismo id")
    }

    await userAccountService.crearCuenta(cuenta)
    //await tokenService.generarTokenUsuario(cuenta)
    return {
        mensaje: "Registro creado exitosamente",
    };
}