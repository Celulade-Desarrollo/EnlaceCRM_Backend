export const truoraRepository = {
    async verificarInfoCedula(cedula) {
        const { document_number } = cedula;
        const Cedula_Cliente = document_number;
        const pool = await poolPromise;
        const result = await pool.request()
            .input("Cedula_Cliente", sql.NVarChar, Cedula_Cliente)
            .query("SELECT * FROM FlujosRegistroEnlace WHERE Cedula_Cliente = @Cedula_Cliente");
        return result.recordset;
    }
}