import { userAccountService } from "../../services/userAccountServiceInstance";

export async function getAllUserAccountUseCase() {
    return await userAccountService.obtenerTodos()
}