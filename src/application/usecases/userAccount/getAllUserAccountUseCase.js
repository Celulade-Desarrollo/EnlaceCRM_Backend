import { userAccountService } from "../../services/userAccountServiceInstance.js";


export async function getAllUserAccountUseCase() {
    return await userAccountService.obtenerTodos()
}