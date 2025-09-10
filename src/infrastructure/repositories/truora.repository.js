import axios from 'axios';
import dotenv from 'dotenv';
import { poolPromise } from "../persistence/database.js";
import sql from "mssql";

dotenv.config();

const TRUORA_API_KEY = process.env.TRUORA_API_KEY;
const TRUORA_API_URL_DIGITAL_IDENTITY = process.env.TRUORA_ENDPOINT_DIGITAL_IDENTITY;

export const truoraRepository = {
    async truoraInfoProcess(process_id) {
        try {
            const response = await axios.get(
                `${TRUORA_API_URL_DIGITAL_IDENTITY}${process_id}/result`,
                {
                    headers: {
                        'Truora-API-Key': TRUORA_API_KEY,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            return response.data;
        } catch (error) {
            throw new Error(`Error al consultar Truora: ${error.message}`);
        }
    },


    async setTruoraStatusProcess(cedula, status) {
    try {
        const pool = await poolPromise;

      
        const result = await pool.request()
            .input("Cedula_Cliente", sql.NVarChar, cedula)
            .input("TruoraStatus", sql.NVarChar, status)
            .query(`
                UPDATE FlujosRegistroEnlace 
                SET truora = @TruoraStatus 
                WHERE Cedula_Cliente = @Cedula_Cliente;
            
                SELECT * FROM FlujosRegistroEnlace 
                WHERE Cedula_Cliente = @Cedula_Cliente;
            `);
        
        if (result.recordset.length === 0) {
            throw new Error("No se encontró registro con esa cédula");
        }

        return result.recordset[0];
    } catch (error) {
        throw new Error(`Error actualizando estado Truora: ${error.message}`);
    }
}
}