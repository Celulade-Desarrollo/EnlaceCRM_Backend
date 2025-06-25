export class AdminAccount {
    constructor({
        Numero_Admin,
        Nombre_Admin,
        Empresa_Admin,
        Cedula_Admin
    }) {
        this.Numero_Admin = Numero_Admin,
        this.Nombre_Admin = Nombre_Admin,
        this.Empresa_Admin = Empresa_Admin,
        this.Cedula_Admin = Cedula_Admin
    }
    ValidarDatos() {
        // Logica para validar datos del administrador  
        if (!this.Cedula_Admin) {
            throw new Error("Falta Cédula del administrador")
        }
    }
}
