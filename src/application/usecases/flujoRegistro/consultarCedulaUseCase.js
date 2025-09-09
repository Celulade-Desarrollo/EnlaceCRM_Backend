import { fetchNbCliente } from "../../services/fetchNbCliente.js";
import { fetchLoginAlpina } from "../../services/fetchAlpina.js";

export async function consultarCedulaUseCase(nbCliente, nbAgenteComercial) {
    const bearerToken = await fetchLoginAlpina();
    const cliente = await fetchNbCliente(nbCliente, nbAgenteComercial, bearerToken)

    return cliente.data[0].documento;
}