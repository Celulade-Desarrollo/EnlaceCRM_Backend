import { userAccountService } from "../../services/userAccountServiceInstance.js";
import { tokenVerifierService } from "../../services/TokenVerifierService.js";
import { tokenGeneratorService } from "../../services/TokenGeneratorService.js";
import { fetchNbCliente } from "../../services/fetchNbCliente.js";
import { alpinaService } from '../../services/alpinaServiceInstance.js';
import { AuthAlpinaAdapter } from '../../../infrastructure/adapters/AuthAlpinaAdapter.js';  
import {fetchLoginAlpina} from '../../services/fetchAlpina.js';

export async function loginUserAccountUseCase(nbCliente, nbAgenteComercial, token){
    const authAdapter = new AuthAlpinaAdapter();
    const bearerToken = await fetchLoginAlpina();

    const cedula = await fetchNbCliente(nbCliente, nbAgenteComercial, bearerToken)

    const cuenta = await userAccountService.validarCuentaCedula(cedula)
    if(!cuenta){
        const error = new Error("Error al verificar la cuenta")
        error.status = 400
        throw error
    }

    const Token = token
    if(!Token) throw new Error("Falta parametro Token")

    const tokenValidation = await tokenVerifierService.verifyToken(token)
    if(!tokenValidation) throw new Error("Token no valido");

    const tokenTenderoEnlaceCRM = await tokenGeneratorService.generateToken({cedula: cedula})
    if(!tokenTenderoEnlaceCRM) throw new Error("Falló la creación del token para el tendero")

        console.log(cuenta)

    return{
     
        token: tokenTenderoEnlaceCRM,
        tipo: "usuario",
        state: "Authenticated",
        idUsuario: cuenta.IdUsuarioFinal,
        cuenta: cuenta 

    }


}