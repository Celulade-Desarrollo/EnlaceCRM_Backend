const loginController = async (req, res) => {
  const { Numero_Cliente, Password } = req.body;

  if (!Numero_Cliente || !Numero_Celular) {
    return res
      .status(400)
      .json({ message: "Número de cliente y celular son requeridos" });
  }

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Numero_Cliente", sql.NVarChar, Numero_Cliente)
      .input("Numero_Celular", sql.NVarChar, Numero_Celular).query(`
            SELECT * FROM UsuarioFinal 
            WHERE Numero_Cliente = @Numero_Cliente AND Numero_Celular = @Numero_Celular
        `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
