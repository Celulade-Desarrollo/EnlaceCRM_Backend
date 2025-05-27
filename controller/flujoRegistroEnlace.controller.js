import { poolPromise } from "../db/database.js"; // Importar la conexión de la base de datos
import sql from "mssql"; // SDK de MYSQL

// Función GET
// Traer TODOS los registros existentes de los usuarios en la base de datos
const getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM FlujosRegistroEnlace");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message); // Si algo sale paila
  }
};

// Función GET:AlpinaId
// Traer el registro de correspondiente al número de cliente de alpina
const getByAlpina = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Numero_de_Cliente_Alpina", sql.NVarChar, req.params.alpinaId)
      .query(
        `SELECT * FROM FlujosRegistroEnlace WHERE Numero_de_Cliente_Alpina = @Numero_de_Cliente_Alpina`
      );

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Función GET:id
// Traer el registro de correspondiente al id del cliente
const getById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM FlujosRegistroEnlace WHERE id = @id");
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getBynumber = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Numero_Celular", sql.NVarChar, req.params.Numero_Celular)
      .query(
        "SELECT * FROM FlujosRegistroEnlace WHERE Numero_Celular = @Numero_Celular"
      );
    res.json(result.recordset[0]);
    res.status(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST para crear un registro del formulario en la bd
const createRegistro = async (req, res) => {
  const {
    Numero_de_Cliente_Alpina,
    Cedula_Cliente,
    Autorizacion_Habeas_Data,
    Autorizacion_Medios_de_Contacto,
    Numero_Celular,
    Correo_Electronico,
    Nombres,
    Primer_Apellido,
    ["2do_Apellido_opcional"]: SegundoApellido,
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
  } = req.body;

  try {
    const pool = await poolPromise;
    const checkDuplicates = await pool
      .request()
      .input("Cedula_Cliente", sql.NVarChar, Cedula_Cliente)
      .input("Numero_Celular", sql.NVarChar, Numero_Celular)
      .input("Correo_Electronico", sql.NVarChar, Correo_Electronico).query(`
    SELECT * FROM FlujosRegistroEnlace
    WHERE Cedula_Cliente = @Cedula_Cliente
       OR Numero_Celular = @Numero_Celular
       OR Correo_Electronico = @Correo_Electronico
  `);

    if (checkDuplicates.recordset.length > 0) {
      const existente = checkDuplicates.recordset[0];
      // Si alguno de los campos coincide, retornar error y detener ejecución
      if (
        existente.Cedula_Cliente == Cedula_Cliente ||
        existente.Numero_Celular == Numero_Celular ||
        existente.Correo_Electronico == Correo_Electronico
      ) {
        return res.status(400).json({
          error:
            "Ya existe un registro con los mismos datos (cédula, celular o correo).",
        });
      }
    }

    const result = await pool
      .request()
      .input("Numero_de_Cliente_Alpina", sql.NVarChar, Numero_de_Cliente_Alpina)
      .input("Cedula_Cliente", sql.NVarChar, Cedula_Cliente)
      .input("Autorizacion_Habeas_Data", sql.Bit, Autorizacion_Habeas_Data)
      .input(
        "Autorizacion_Medios_de_Contacto",
        sql.Bit,
        Autorizacion_Medios_de_Contacto
      )
      .input("Numero_Celular", sql.NVarChar, Numero_Celular)
      .input("Correo_Electronico", sql.NVarChar, Correo_Electronico)
      .input("Nombres", sql.NVarChar, Nombres)
      .input("Primer_Apellido", sql.NVarChar, Primer_Apellido)
      .input("SegundoApellido", sql.NVarChar, SegundoApellido)
      .input("Genero", sql.NVarChar, Genero)
      .input("Estado_Civil", sql.NVarChar, Estado_Civil)
      .input("Fecha_de_Nacimiento", sql.NVarChar, Fecha_de_Nacimiento)
      .input("Pais_de_Nacimiento", sql.NVarChar, Pais_de_Nacimiento)
      .input(
        "Departamento_de_Nacimiento",
        sql.NVarChar,
        Departamento_de_Nacimiento
      )
      .input("Nivel_Educativo", sql.NVarChar, Nivel_Educativo)
      .input("Estrato", sql.NVarChar, Estrato)
      .input("Grupo_Etnico", sql.NVarChar, Grupo_Etnico)
      .input("Declara_Renta", sql.Bit, Declara_Renta)
      .input(
        "Esta_obligado_a_tener_RUT",
        sql.Bit,
        Esta_obligado_a_tener_RUT_por_tu_actividad_economica
      )
      .input(
        "Ubicacion_del_Negocio_Departamento",
        sql.NVarChar,
        Ubicacion_del_Negocio_Departamento
      )
      .input(
        "Ubicacion_del_Negocio_Ciudad",
        sql.NVarChar,
        Ubicacion_del_Negocio_Ciudad
      )
      .input("Direccion", sql.NVarChar, Direccion)
      .input("Detalles", sql.NVarChar, Detalles)
      .input("Barrio", sql.NVarChar, Barrio)
      .input("Numero_de_neveras", sql.NVarChar, Numero_de_neveras)
      .input("Registrado_Camara_Comercio", sql.Bit, Registrado_Camara_Comercio)
      .input("Rango_de_Ingresos", sql.NVarChar, Rango_de_Ingresos)
      .input(
        "Persona_expuesta_politicamente_PEP",
        sql.Bit,
        Persona_expuesta_politicamente_PEP
      )
      .input(
        "Familiar_expuesto_politicamente_PEP",
        sql.Bit,
        Familiar_expuesto_politicamente_PEP
      )
      .input(
        "Operaciones_moneda_extranjera",
        sql.Bit,
        Operaciones_moneda_extranjera
      )
      .input(
        "Declaracion_residencia_fiscal",
        sql.Bit,
        Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia
      )
      .input("Confirmacion_Identidad", sql.Bit, Confirmacion_Identidad)
      .query(
        `INSERT INTO FlujosRegistroEnlace 
            (Numero_de_Cliente_Alpina, Cedula_Cliente, Autorizacion_Habeas_Data, Autorizacion_Medios_de_Contacto,
            Numero_Celular, Correo_Electronico, Nombres, Primer_Apellido, [2do_Apellido_opcional],
            Genero, Estado_Civil, Fecha_de_Nacimiento, Pais_de_Nacimiento, Departamento_de_Nacimiento,
            Nivel_Educativo, Estrato, Grupo_Etnico, Declara_Renta, Esta_obligado_a_tener_RUT_por_tu_actividad_economica,
            Ubicacion_del_Negocio_Departamento, Ubicacion_del_Negocio_Ciudad, Direccion, Detalles, Barrio,
            Numero_de_neveras, Registrado_Camara_Comercio, Rango_de_Ingresos, Persona_expuesta_politicamente_PEP,
            Familiar_expuesto_politicamente_PEP, Operaciones_moneda_extranjera,
            Declaracion_de_nacionalidad_y_residencia_fiscal_en_Colombia, Confirmacion_Identidad)
            VALUES 
            (@Numero_de_Cliente_Alpina, @Cedula_Cliente, @Autorizacion_Habeas_Data, @Autorizacion_Medios_de_Contacto,
            @Numero_Celular, @Correo_Electronico, @Nombres, @Primer_Apellido, @SegundoApellido,
            @Genero, @Estado_Civil, @Fecha_de_Nacimiento, @Pais_de_Nacimiento, @Departamento_de_Nacimiento,
            @Nivel_Educativo, @Estrato, @Grupo_Etnico, @Declara_Renta, @Esta_obligado_a_tener_RUT,
            @Ubicacion_del_Negocio_Departamento, @Ubicacion_del_Negocio_Ciudad, @Direccion, @Detalles, @Barrio,
            @Numero_de_neveras, @Registrado_Camara_Comercio, @Rango_de_Ingresos, @Persona_expuesta_politicamente_PEP,
            @Familiar_expuesto_politicamente_PEP, @Operaciones_moneda_extranjera,
            @Declaracion_residencia_fiscal, @Confirmacion_Identidad)`
      );

    res.status(201).json({
      message: {
        mensaje: "Registro creado exitosamente",
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Funcion DELETE por id
const deleteById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM FlujosRegistroEnlace WHERE id = @id");
    res.json({ message: "Registro eliminado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export {
  getAll,
  getById,
  getByAlpina,
  createRegistro,
  deleteById,
  getBynumber,
};
