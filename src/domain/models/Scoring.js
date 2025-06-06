export class Scoring {
  constructor({
    IdFlujoRegistro,
    Scoring,
    Cupo,
    Numero_Cliente,
    Cedula_Cliente,
    Estado = "pendiente"
  }) {
    this.IdFlujoRegistro = IdFlujoRegistro;
    this.Scoring = Scoring;
    this.Cupo = Cupo;
    this.Numero_Cliente = Numero_Cliente;
    this.Cedula_Cliente = Cedula_Cliente;
    this.Estado = Estado;
  }
}
