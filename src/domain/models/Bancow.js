export class Bancow {
    constructor({
        IdFlujoRegistro,
        Validacion_Banco_listas,
        Aprobacion_Cupo_sugerido,
        Pagare_Digital_Firmado,
        Creacion_Core_Bancario,
        UsuarioAprobado,
    }) {
        this.IdFlujoRegistro = IdFlujoRegistro;
        this.Validacion_Banco_listas = Validacion_Banco_listas;
        this.Aprobacion_Cupo_sugerido = Aprobacion_Cupo_sugerido;
        this.Pagare_Digital_Firmado = Pagare_Digital_Firmado;
        this.Creacion_Core_Bancario = Creacion_Core_Bancario;
        this.UsuarioAprobado = UsuarioAprobado;
    }

    ValidarDatos() {

        if (!this.IdFlujoRegistro) {
            throw new Error("Falta IdFlujoRegistro")
        }
    }
}



