import SQLServerUbicacionRepository from "../../infrastructure/repositories/SQLServerUbicacionRepository.js";
import UbicacionService from "./UbicacionService.js";
 
const repository = new SQLServerUbicacionRepository();
export const ubicacionService = new UbicacionService(repository);