export class UserAccount {
    constructor({
        IdFlujoRegistro,
        CupoFinal,
        Numero_Cliente,
        Cedula_Usuario,
        CupoDisponible
    }) {
        this.IdFlujoRegistro = IdFlujoRegistro,
            this.CupoFinal = CupoFinal,
            this.Numero_Cliente = Numero_Cliente,
            this.Cedula_Usuario = Cedula_Usuario,
            this.CupoDisponible = CupoDisponible
    }
    ValidarDatos() {
        // Logica para validar datos del bancow 
        if (!this.IdFlujoRegistro) {
            throw new Error("Falta IdFlujoRegistro")
        }
    }
}
