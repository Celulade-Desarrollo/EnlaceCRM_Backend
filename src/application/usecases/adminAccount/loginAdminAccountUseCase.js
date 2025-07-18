import { adminAccountService } from "../../services/adminAccountServiceInstance.js";
import { tokenGeneratorService } from "../../services/TokenGeneratorService.js";
import bcrypt from 'bcrypt';

export async function loginAdminAccountUseCase(Cedula, Password){


    const Account = await adminAccountService.validarCuentaCedula(Cedula)
    if(!Account) throw new Error(`Cuenta no encontrada para ${Cedula}`)

    const comparePassword = await bcrypt.compare(Password, Account.Contrasena)
    if(!comparePassword) throw new Error("Error en la autenticación");


    const token = await tokenGeneratorService.generateToken({Account: Account.Cedula})
    return {
        token: token,
        tipo: "admin",
        company: Account.Empresa_Admin,
        state: "Authenticated"
    }    

}