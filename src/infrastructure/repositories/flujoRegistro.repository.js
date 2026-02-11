import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

export const flujoRegistroRepository = {
  async verificarDuplicados(input) {
    const { Cedula_Cliente, Numero_Celular, Correo_Electronico } = input;
    const pool = await poolPromise;

    const result = await pool.request()
      .input("Cedula_Cliente", sql.NVarChar, Cedula_Cliente)
      .input("Numero_Celular", sql.NVarChar, Numero_Celular)
      .input("Correo_Electronico", sql.NVarChar, Correo_Electronico)
      .query(`
        SELECT 1 FROM FlujosRegistroEnlace
        WHERE Cedula_Cliente = @Cedula_Cliente
           OR Numero_Celular = @Numero_Celular
           OR Correo_Electronico = @Correo_Electronico
      `);

    return result.recordset.length > 0;
  },

  async obtenerPorCedulaYNbCliente(nbCliente) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("nbCliente", sql.VarChar, nbCliente)
      .query(`
        SELECT TOP 1 * 
        FROM FlujosRegistroEnlace
        WHERE nbCliente = @nbCliente
      `);

    return result.recordset[0] || null;
  },

  async obtenerEstadoYCupo(nbCliente) {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("nbCliente", sql.VarChar, nbCliente)
    .query(`
      SELECT TOP 1
        fre.Id,
        fre.Cedula_Cliente,
        fre.nbCliente,
        fre.Estado,
        fre.Nombres,
        fre.Primer_Apellido,
        fre.[2do_Apellido_opcional],
        uf.CupoDisponible,
        uf.BloqueoPorMora
      FROM FlujosRegistroEnlace fre
      LEFT JOIN UsuarioFinal uf
        ON uf.IdFlujoRegistro = fre.Id
      WHERE fre.nbCliente = @nbCliente
    `);

  return result.recordset[0] || null;
},
async obtenerScoringPorFlujo(idFlujoRegistro) {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
    .query(`
      SELECT TOP 1 *
      FROM FlujosRegistroEnlaceScoring
      WHERE IdFlujoRegistro = @IdFlujoRegistro
    `);

  return result.recordset[0] || null;
},
async obtenerBancoPorFlujo(idFlujoRegistro) {
  const pool = await poolPromise;

  const result = await pool.request()
    .input("IdFlujoRegistro", sql.Int, idFlujoRegistro)
    .query(`
      SELECT TOP 1 *
      FROM FlujosRegistroBancoW
      WHERE IdFlujoRegistro = @IdFlujoRegistro
    `);

  return result.recordset[0] || null;
},

async obtenerEstadoYCupoTodos() {
  const pool = await poolPromise;

  const result = await pool.request().query(`
    SELECT 
      fre.Id,
      fre.nbCliente,
      fre.Nombres,
      fre.Primer_Apellido,
      fre.[2do_Apellido_opcional],
      uf.CupoDisponible,
      uf.BloqueoPorMora
    FROM FlujosRegistroEnlace fre
    OUTER APPLY (
      SELECT TOP 1
        uf2.CupoDisponible,
        uf2.BloqueoPorMora
      FROM UsuarioFinal uf2
      WHERE uf2.IdFlujoRegistro = fre.Id
      ORDER BY uf2.IdUsuarioFinal DESC
    ) uf
  `);

  return result.recordset;
},

  async insertarRegistro(input) {
    const pool = await poolPromise;

      const rangoIngresosNum = parseFloat(
        String(input.Rango_de_Ingresos).replace(/\./g, "").replace(",", ".")
      )
      const ingresosOperativoNeto = rangoIngresosNum - (rangoIngresosNum / 1.2);
    await pool.request()
      .input("Estado", sql.NVarChar, input.Estado || "pendiente")
      .input("Numero_de_Cliente_Alpina", sql.NVarChar, input.Numero_de_Cliente_Alpina)
      .input("Cedula_Cliente", sql.NVarChar, input.Cedula_Cliente)
      .input("Autorizacion_Habeas_Data", sql.Bit, input.Autorizacion_Habeas_Data)
      .input("Autorizacion_Medios_de_Contacto", sql.Bit, input.Autorizacion_Medios_de_Contacto)
      .input("Numero_Celular", sql.NVarChar, input.Numero_Celular)
      .input("Correo_Electronico", sql.NVarChar, input.Correo_Electronico)
      .input("Nombres", sql.NVarChar, input.Nombres)
      .input("Primer_Apellido", sql.NVarChar, input.Primer_Apellido)
      .input("SegundoApellido", sql.NVarChar, input.SegundoApellido)
      .input("Genero", sql.NVarChar, input.Genero)
      .input("Estado_Civil", sql.NVarChar, input.Estado_Civil)
      .input("Fecha_de_Nacimiento", sql.NVarChar, input.Fecha_de_Nacimiento)
      .input("Pais_de_Nacimiento", sql.NVarChar, input.Pais_de_Nacimiento)
      .input("Departamento_de_Nacimiento", sql.NVarChar, input.Departamento_de_Nacimiento)
      .input("Nivel_Educativo", sql.NVarChar, input.Nivel_Educativo)
      .input("Estrato", sql.NVarChar, input.Estrato)
      .input("Grupo_Etnico", sql.NVarChar, input.Grupo_Etnico)
      .input("Declara_Renta", sql.Bit, input.Declara_Renta)
      .input("Esta_obligado_a_tener_RUT", sql.Bit, input.Esta_obligado_a_tener_RUT_por_tu_actividad_economica)
      .input("Ubicacion_del_Negocio_Departamento", sql.NVarChar, input.Ubicacion_del_Negocio_Departamento)
      .input("Ubicacion_del_Negocio_Ciudad", sql.NVarChar, input.Ubicacion_del_Negocio_Ciudad)
      .input("Direccion", sql.NVarChar, input.Direccion)
      .input("Detalles", sql.NVarChar, input.Detalles)
      .input("Barrio", sql.NVarChar, input.Barrio)
      .input("Nombre_Tienda", sql.NVarChar, input.Nombre_Tienda)
      .input("Numero_de_neveras", sql.NVarChar, input.Numero_de_neveras)
      .input("Registrado_Camara_Comercio", sql.Bit, input.Registrado_Camara_Comercio)
      .input("Rango_de_Ingresos", sql.NVarChar, input.Rango_de_Ingresos)
      .input("Ingreso_Operativo_Neto", sql.Decimal(18,2), ingresosOperativoNeto)
      .input("Persona_expuesta_politicamente_PEP", sql.Bit, input.Persona_expuesta_politicamente_PEP)
      .input("Familiar_expuesto_politicamente_PEP", sql.Bit, input.Familiar_expuesto_politicamente_PEP)
      .input("Operaciones_moneda_extranjera", sql.Bit, input.Operaciones_moneda_extranjera)
      .input("Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia", sql.Bit, input.Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia)
      .input("Confirmacion_Identidad", sql.Bit, input.Confirmacion_Identidad)
      .input("Cedula_Conyuge", sql.NVarChar, input.Cedula_Conyuge)
      .input("Nombre_Conyuge", sql.NVarChar, input.Nombre_Conyuge)
      .input("Apellido_Conyuge", sql.NVarChar, input.Apellido_Conyuge)
      .input("Valor_Bienes", sql.NVarChar, input.Valor_Bienes)
      .input("Valor_Deudas", sql.NVarChar, input.Valor_Deudas)
      .input("Gastos_Mensuales", sql.NVarChar, input.Gastos_Mensuales)
      .input("Deuda_Mensual", sql.NVarChar, input.Deuda_Mensual)
      .input("Ingresos_Diferentes_Negocio", sql.NVarChar, input.Ingresos_Diferentes_Negocio)
      .input("nbCliente", sql.VarChar, input.nbCliente)
      .input("nbAgenteComercial", sql.VarChar, input.nbAgenteComercial)
      .input(
  "Monto_ingresos_diferentes_negocio",
  sql.NVarChar,
  input.Monto_ingresos_diferentes_negocio === 0 ||
  input.Monto_ingresos_diferentes_negocio === "0" ||
  input.Monto_ingresos_diferentes_negocio === "" ||
  input.Monto_ingresos_diferentes_negocio == null
    ? "No"
    : input.Monto_ingresos_diferentes_negocio.toString()
)

      .input(
  "Monto_Mensual_Deuda",
  sql.NVarChar,
  !input.Monto_Mensual_Deuda ||
  input.Monto_Mensual_Deuda === "0" ||
  input.Monto_Mensual_Deuda === "0.00" ||
  input.Monto_Mensual_Deuda === "0,00" ||
  input.Monto_Mensual_Deuda === "0.000"
    ? "No"
    : input.Monto_Mensual_Deuda.toString()
)
.input("Fecha_Envio_Formulario", sql.DateTime, new Date())
      .query(`
        INSERT INTO FlujosRegistroEnlace (
          Estado, Numero_de_Cliente_Alpina, Cedula_Cliente, Autorizacion_Habeas_Data,
          Autorizacion_Medios_de_Contacto, Numero_Celular, Correo_Electronico, Nombres,
          Primer_Apellido, [2do_Apellido_opcional], Genero, Estado_Civil, Fecha_de_Nacimiento,
          Pais_de_Nacimiento, Departamento_de_Nacimiento, Nivel_Educativo, Estrato, Grupo_Etnico,
          Declara_Renta, Esta_obligado_a_tener_RUT_por_tu_actividad_economica,
          Ubicacion_del_Negocio_Departamento, Ubicacion_del_Negocio_Ciudad, Direccion, Detalles,
          Barrio,  Nombre_Tienda, Numero_de_neveras, Registrado_Camara_Comercio, Rango_de_Ingresos,Ingreso_Operativo_Neto,
          Persona_expuesta_politicamente_PEP, Familiar_expuesto_politicamente_PEP,
          Operaciones_moneda_extranjera, Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia,
          Confirmacion_Identidad,Cedula_Conyuge, Nombre_Conyuge, Apellido_Conyuge, Valor_Bienes, Valor_Deudas,
          Gastos_Mensuales, Deuda_Mensual, Ingresos_Diferentes_Negocio, nbCliente, nbAgenteComercial,Monto_ingresos_diferentes_negocio,
          Monto_Mensual_Deuda,fecha_envio_formulario
        ) VALUES (
          @Estado, @Numero_de_Cliente_Alpina, @Cedula_Cliente, @Autorizacion_Habeas_Data,
          @Autorizacion_Medios_de_Contacto, @Numero_Celular, @Correo_Electronico, @Nombres,
          @Primer_Apellido, @SegundoApellido, @Genero, @Estado_Civil, @Fecha_de_Nacimiento,
          @Pais_de_Nacimiento, @Departamento_de_Nacimiento, @Nivel_Educativo, @Estrato,
          @Grupo_Etnico, @Declara_Renta, @Esta_obligado_a_tener_RUT,
          @Ubicacion_del_Negocio_Departamento, @Ubicacion_del_Negocio_Ciudad, @Direccion, @Detalles,
          @Barrio, @Nombre_Tienda, @Numero_de_neveras, @Registrado_Camara_Comercio, @Rango_de_Ingresos,@Ingreso_Operativo_Neto,
          @Persona_expuesta_politicamente_PEP, @Familiar_expuesto_politicamente_PEP,
          @Operaciones_moneda_extranjera, @Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia, @Confirmacion_Identidad, @Cedula_Conyuge, @Nombre_Conyuge,@Apellido_Conyuge,
          @Valor_Bienes, @Valor_Deudas, @Gastos_Mensuales, @Deuda_Mensual, @Ingresos_Diferentes_Negocio,
          @nbCliente, @nbAgenteComercial,@Monto_ingresos_diferentes_negocio,@Monto_Mensual_Deuda,@Fecha_Envio_Formulario
        )
      `);
  },


  async obtenerTodos() {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM FlujosRegistroEnlace");
    return result.recordset;
  },

  async obtenerPorId(id) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM FlujosRegistroEnlace WHERE id = @id");
    return result.recordset[0];
  },

  async obtenerPorEstado(estado) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("estado", sql.NVarChar, estado)
      .query("SELECT * FROM FlujosRegistroEnlace WHERE Estado = @estado");
    return result.recordset;
  },

  async actualizarEstadoPorId(id, estado) {
    const pool = await poolPromise;
    await pool.request()
      .input("id", sql.Int, id)
      .input("estado", sql.NVarChar, estado)
      .query("UPDATE FlujosRegistroEnlace SET Estado = @estado WHERE id = @id");
  },

 async actualizarClienteAproboporId(id, respuestaCliente) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("idFlujoRegistro", sql.Int, id)
    .input("Cliente_Acepto", sql.NVarChar, respuestaCliente)
    .query(`
      UPDATE FlujosRegistroEnlaceScoring
      SET Cliente_Acepto = @Cliente_Acepto
      WHERE idFlujoRegistro = @idFlujoRegistro
    `);

    if (result.rowsAffected[0] === 0) {
      throw new Error("No se encontró ningún registro con ese ID");
    }
  },
  async eliminarPorId(id) {
    const pool = await poolPromise;
    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM FlujosRegistroEnlace WHERE id = @id");
  },

  async obtenerPorNumeroClienteAlpina(numeroCliente) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Numero_Cliente", sql.NVarChar, numeroCliente)
      .query("SELECT * FROM FlujosRegistroEnlace WHERE Numero_de_Cliente_Alpina = @Numero_Cliente");
  return result.recordset;
},

async obtenerPorNumeroCelular(numeroCelular) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("Numero_Celular", sql.NVarChar, numeroCelular)
    .query("SELECT * FROM FlujosRegistroEnlace WHERE Numero_Celular = @Numero_Celular");
  return result.recordset;
}
};