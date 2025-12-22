import bcrypt from 'bcrypt';
import { adminAccountService } from "../../services/adminAccountServiceInstance.js";
import { tokenGeneratorService } from "../../services/TokenGeneratorService.js";

export async function updateContrasena(id, nuevaContrasena) {
    const contrasena = nuevaContrasena
    const hasedPassword = await bcrypt.hash(contrasena, 10)
    return await adminAccountService.actualizarContrasena(id, hasedPassword)
}