import { adminAccountService } from "../../services/adminAccountServiceInstance.js";
import { tokenGeneratorService } from "../../services/TokenGeneratorService.js";
import {LogsService} from "../../services/LogsService.js"
import {LOGS_TYPE_NAMES} from "../../../constants/LogsType.js"
import {LOGS_TYPE} from "../../../constants/LogsType.js"
import bcrypt from 'bcrypt';

export async function loginAdminAccountUseCase(Cedula, Password){


    const Account = await adminAccountService.validarCuentaCedula(Cedula)
    if(!Account) throw new Error(`Cuenta no encontrada para ${Cedula}`)

    const comparePassword = await bcrypt.compare(Password, Account.Contrasena)
    if(!comparePassword) throw new Error("Error en la autenticación");

    const Log = await LogsService.generarLog(Account.Cedula_Admin, Account.Empresa_Admin, LOGS_TYPE.LOGIN, new Date(), `El usuario administrador ${Account.Nombre_Admin} de ${Account.Empresa_Admin} ha iniciado sesion`)
    
    const token = await tokenGeneratorService.generateToken({Account: Account.Cedula})
    return {
        token: token,
        tipo: "admin",
        company: Account.Empresa_Admin,
        state: "Authenticated"
    }    

}