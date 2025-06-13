import { userAccountService } from "../services/userAccountServiceInstance";
import { UserAccount } from "../../domain/models/UserAccount";

export async function createUserAccountUseCase(input) {

    const cuenta = new UserAccount(input)

    // Validaciones 
    cuenta.ValidarDatos()

    if (!input || !input.IdFlujoRegistro || !input.CupoFinal || !input.Numero_Cliente) {
        throw new Error("Faltan campos requeridos: IdFlujoRegistro, CupoFinal o Numero_Cliente");
    }

    const duplicado = await userAccountService.verificarDuplicados(cuenta)
    if (duplicado) {
        throw new Error("Ya existe una cuenta con este mismo id")
    }

    await userAccountService.crearCuenta(cuenta)
    return {
        mensaje: "Registro creado exitosamente",
    };
}