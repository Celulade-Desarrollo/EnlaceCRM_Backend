import { abonoRepository } from "../repositories/abono.repository.js";
import { AbonoPort } from "../../domain/ports/AbonoPort.js";

export class AbonoAdapter extends AbonoPort {
  async insertarAbono(abono) {  
    return await abonoRepository.insertarAbono(abono);
  }
}
