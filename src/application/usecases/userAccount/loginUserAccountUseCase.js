import { userAccountService } from "../../services/userAccountServiceInstance.js";
import { tokenVerifierService } from "../../services/TokenVerifierService.js";
import { tokenGeneratorService } from "../../services/TokenGeneratorService.js";
import { fetchNbCliente } from "../../services/fetchNbCliente.js";
import { fetchLoginAlpina } from "../../services/fetchAlpina.js";

export async function loginUserAccountUseCase(nbCliente, nbAgenteComercial, token){
    const bearerToken = await fetchLoginAlpina()
    const cedula = await fetchNbCliente(nbCliente, nbAgenteComercial, bearerToken)


    const cuenta = await userAccountService.validarCuentaCedula(cedula)
    if(!cuenta) throw new Error("Cuenta no existente")

    const Token = token
    if(!Token) throw new Error("Falta parametro Token")

    const tokenValidation = await tokenVerifierService.verifyToken(token)
    if(!tokenValidation) throw new Error("Token no valido");

    const tokenTenderoEnlaceCRM = await tokenGeneratorService.generateToken(cuenta)
    if(!tokenTenderoEnlaceCRM) throw new Error("Falló la creación del token para el tendero")

    return{
        token: tokenTenderoEnlaceCRM,
        tipo: "usuario",
        state: "Authenticated"
    }


}