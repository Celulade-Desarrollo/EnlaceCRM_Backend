import { userAccountService } from "../../services/userAccountServiceInstance.js";

export async function verifyUserAccountTypeUseCase(Cedula){
    return await userAccountService.cedulamiddleware(Cedula)
}