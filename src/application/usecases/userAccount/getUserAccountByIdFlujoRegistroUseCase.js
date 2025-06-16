import { userAccountService } from "../../services/userAccountServiceInstance.js";

export async function getUserAccountByIdFlujoRegistro(id) {
    return await userAccountService.obtenerPorIdFlujoRegistro(id)
}