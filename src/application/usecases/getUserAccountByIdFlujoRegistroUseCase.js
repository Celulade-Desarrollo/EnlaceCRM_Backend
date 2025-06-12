import { userAccountService } from "../services/userAccountServiceInstance";

export async function getUserAccountByIdFlujoRegistro(id) {
    return await userAccountService.obtenerPorIdFlujoRegistro(id)
}