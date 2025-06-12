import { userAccountService } from "../services/userAccountServiceInstance";

export async function deleteUserUserAccountById(id) {

    await userAccountService.eliminarPorIdFlujoRegistro(id)
    return {
        mensaje: "Registro eliminado correctamente",
    };
}