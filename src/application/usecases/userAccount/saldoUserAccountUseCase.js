import { userAccountService } from "../../services/userAccountServiceInstance.js";

export async function saldoUserAccountUseCase(idUsuario){
    return await userAccountService.traerSaldo(idUsuario)
}