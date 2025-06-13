export class Scoring {
  constructor({
    IdFlujoRegistro,
    scoringValue,
    Cupo,
    Numero_Cliente,
    Cedula_Cliente,
    Estado = "pendiente"
  }) {
    this.IdFlujoRegistro = IdFlujoRegistro;
    this.scoringValue = scoringValue;
    this.Cupo = Cupo;
    this.Numero_Cliente = Numero_Cliente;
    this.Cedula_Cliente = Cedula_Cliente;
    this.Estado = Estado;
  }

  toString() {
    return `Scoring: ${this.IdFlujoRegistro} - ${this.scoringValue}`;
  }
}