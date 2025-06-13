export class UserAccount {
    constructor({
        IdFlujoRegistro,
        CupoFinal,
        Numero_Cliente,
    }) {
        this.IdFlujoRegistro = IdFlujoRegistro,
            this.CupoFinal = CupoFinal,
            this.Numero_Cliente = Numero_Cliente
    }
    ValidarDatos() {
        // Logica para validar datos del bancow 
        if (!this.IdFlujoRegistro) {
            throw new Error("Falta IdFlujoRegistro")
        }
    }
}
