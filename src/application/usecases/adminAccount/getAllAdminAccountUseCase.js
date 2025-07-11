import { adminAccountService } from "../../services/adminAccountServiceInstance.js";

export async function getAllAdminAccountUseCase(){
    return await adminAccountService.obtenerTodos()
}