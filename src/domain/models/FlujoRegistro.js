export class FlujoRegistro {
  constructor({
    Numero_de_Cliente_Alpina,
    Cedula_Cliente,
    Autorizacion_Habeas_Data,
    Autorizacion_Medios_de_Contacto,
    Numero_Celular,
    Correo_Electronico,
    Nombres,
    Primer_Apellido,
    SegundoApellido,
    Genero,
    Estado_Civil,
    Fecha_de_Nacimiento,
    Pais_de_Nacimiento,
    Departamento_de_Nacimiento,
    Nivel_Educativo,
    Estrato,
    Grupo_Etnico,
    Declara_Renta,
    Esta_obligado_a_tener_RUT_por_tu_actividad_economica,
    Ubicacion_del_Negocio_Departamento,
    Ubicacion_del_Negocio_Ciudad,
    Direccion,
    Detalles,
    Barrio,
    Numero_de_neveras,
    Registrado_Camara_Comercio,
    Rango_de_Ingresos,
    Persona_expuesta_politicamente_PEP,
    Familiar_expuesto_politicamente_PEP,
    Operaciones_moneda_extranjera,
    Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia,
    Confirmacion_Identidad,
    Estado = "pendiente",
    Cedula_Conyuge = "No aplica",
    Nombre_Conyuge = "No aplica",
    Apellido_Conyuge = "No aplica" ,
  }) {
    this.Numero_de_Cliente_Alpina = Numero_de_Cliente_Alpina;
    this.Cedula_Cliente = Cedula_Cliente;
    this.Autorizacion_Habeas_Data = Autorizacion_Habeas_Data;
    this.Autorizacion_Medios_de_Contacto = Autorizacion_Medios_de_Contacto;
    this.Numero_Celular = Numero_Celular;
    this.Correo_Electronico = Correo_Electronico;
    this.Nombres = Nombres;
    this.Primer_Apellido = Primer_Apellido;
    this.SegundoApellido = SegundoApellido;
    this.Genero = Genero;
    this.Estado_Civil = Estado_Civil;
    this.Fecha_de_Nacimiento = Fecha_de_Nacimiento;
    this.Pais_de_Nacimiento = Pais_de_Nacimiento;
    this.Departamento_de_Nacimiento = Departamento_de_Nacimiento;
    this.Nivel_Educativo = Nivel_Educativo;
    this.Estrato = Estrato;
    this.Grupo_Etnico = Grupo_Etnico;
    this.Declara_Renta = Declara_Renta;
    this.Esta_obligado_a_tener_RUT_por_tu_actividad_economica = Esta_obligado_a_tener_RUT_por_tu_actividad_economica;
    this.Ubicacion_del_Negocio_Departamento = Ubicacion_del_Negocio_Departamento;
    this.Ubicacion_del_Negocio_Ciudad = Ubicacion_del_Negocio_Ciudad;
    this.Direccion = Direccion;
    this.Detalles = Detalles;
    this.Barrio = Barrio;
    this.Numero_de_neveras = Numero_de_neveras;
    this.Registrado_Camara_Comercio = Registrado_Camara_Comercio;
    this.Rango_de_Ingresos = Rango_de_Ingresos;
    this.Persona_expuesta_politicamente_PEP = Persona_expuesta_politicamente_PEP;
    this.Familiar_expuesto_politicamente_PEP = Familiar_expuesto_politicamente_PEP;
    this.Operaciones_moneda_extranjera = Operaciones_moneda_extranjera;
    this.Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia = Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia;
    this.Confirmacion_Identidad = Confirmacion_Identidad;
    this.Estado = Estado;
    this.Cedula_Conyuge = Cedula_Conyuge;
    this.Nombre_Conyuge = Nombre_Conyuge;
    this.Apellido_Conyuge = Apellido_Conyuge;
  }
  validarDatos() {
    // Aquí puedes agregar lógica para validar los datos de entrada
    if (!this.Numero_de_Cliente_Alpina || !this.Cedula_Cliente) {
      throw new Error("Faltan datos obligatorios");
    }
  }
}
