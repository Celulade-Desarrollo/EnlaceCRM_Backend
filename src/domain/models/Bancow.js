export class Bancow {
    constructor({
        IdFlujoRegistro,
        Validacion_Banco_Listas,
        Apronacion_Cupo_Sugerido,
        Pagare_digital_Firmado,
        Creacion_Core_Bancario,
        UsuarioAprobado,
    }) {
        this.IdFlujoRegistro = IdFlujoRegistro;
        this.Validacion_Banco_Listas = Validacion_Banco_Listas;
        this.Apronacion_Cupo_Sugerido = Apronacion_Cupo_Sugerido;
        this.Pagare_digital_Firmado = Pagare_digital_Firmado;
        this.Creacion_Core_Bancario = Creacion_Core_Bancario;
        this.UsuarioAprobado = UsuarioAprobado;
    }

    ValidarDatos() {

        // Logica para validar datos del bancow 
        if (!this.IdFlujoRegistro) {
            throw new Error("Falta IdFlujoRegistro")
        }
    }
}



