import { adminAccountService } from "../../services/adminAccountServiceInstance.js";
import {AdminAccount} from "../../../domain/models/AdminAccount.js"

import bcrypt from 'bcrypt';

export async function createAdminAccountUseCase(input){
    const adminAccount = new AdminAccount(input)
    const {Cedula_Admin} = input
    const {Contrasena} = input
    console.log(adminAccount)

    // hasheo de contraseña 
    const hasedPassword = await bcrypt.hash(Contrasena, 10)
    adminAccount.Contrasena = hasedPassword
    
    // Verificación de cuenta existente
    const isCreated = await adminAccountService.validarCuentaCedula(Cedula_Admin)
    if(isCreated) throw new Error(`Ya existe una cuenta con ${Cedula_Admin}`);

    // Creación de la cuenta 
    const AdminAccountCreated = await adminAccountService.crearCuenaAdmin(adminAccount)

    return{
        state: "Cuenta creada correctamente para " + Cedula_Admin,
        tipo: "Admin"
    }
}

