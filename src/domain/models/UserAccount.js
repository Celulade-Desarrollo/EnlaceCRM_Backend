export class UserAccount {
    constructor({
        IdFlujoRegistro,
        CupoFinal,
        Numero_Cliente,
        Contraseña = null
    }) {
        this.IdFlujoRegistro = IdFlujoRegistro,
            this.CupoFinal = CupoFinal,
            this.Numero_Cliente = Numero_Cliente,
            this.Contraseña = Contraseña
    }
    ValidarDatos() {
        // Logica para validar datos del bancow 
        if (!this.IdFlujoRegistro) {
            throw new Error("Falta IdFlujoRegistro")
        }
    }
}
