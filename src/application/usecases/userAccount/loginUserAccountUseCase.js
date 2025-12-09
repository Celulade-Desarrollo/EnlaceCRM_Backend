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
    const cuentaNbCliente = await userAccountService.verificarNbCliente(nbCliente)
    if(cuentaNbCliente){
        const error = new Error("Ya existe una solicitud de cuenta en proceso para este cliente.");
        error.status = 207;
        throw error;
    }

    const cuenta = await userAccountService.validarCuentaCedula(cedula)

    if(!cuenta){
         const error = new Error("No se encontró una cuenta creada para esta cédula.");
        error.status = 400;
        throw error;
    }

    if (cuenta.EstadoFlujo && cuenta.EstadoFlujo.toLowerCase() === 'negado') {
        const error = new Error("El registro para esta cédula ha sido negado.");
        error.status = 403;
        throw error;
    }   
    /*

    const Token = token
    if(!Token) throw new Error("Falta parametro Token")

    const tokenValidation = await tokenVerifierService.verifyToken(token)
    if (!tokenValidation) {
        const error = new Error("Token no valido");
        error.status = 401;
        throw error;
    }
*/
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