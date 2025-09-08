export const truoraRepository = {
    async verificarInfoCedula(data) {
        const { document_number, validation_status } = data;
        const Cedula_Cliente = document_number;
        const pool = await poolPromise;

      
        const result = await pool.request()
            .input("Cedula_Cliente", sql.NVarChar, Cedula_Cliente)
            .query("SELECT * FROM FlujosRegistroEnlace WHERE Cedula_Cliente = @Cedula_Cliente");

        
        if (result.recordset.length > 0) {
            await pool.request()
                .input("Cedula_Cliente", sql.NVarChar, Cedula_Cliente)
                .input("TruoraStatus", sql.NVarChar, validation_status)
                .query(`
                    UPDATE FlujosRegistroEnlace 
                    SET truora = @TruoraStatus 
                    WHERE Cedula_Cliente = @Cedula_Cliente
                `);
        }

        return result.recordset;
    }
}