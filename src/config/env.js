import dotenv from 'dotenv';
dotenv.config();

export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_SERVER = process.env.DB_SERVER;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT;

export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const TWILIO_VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

export const ALPINA_API_KEY = process.env.ALPINA_API_KEY;
export const ALPINA_FACTURAS_API_URL = process.env.ALPINA_FACTURAS_API_URL;

// 🔧 Agrega estas tres líneas:
export const ALPINA_AUTH_URL = process.env.AUTH_URL;
export const ALPINA_AUTH_USERNAME = process.env.AUTH_USERNAME;
export const ALPINA_AUTH_PASSWORD = process.env.AUTH_PASSWORD;


export const ALPINA_CLIENTE_ID = process.env.ALPINA_CLIENTE_ID;
export const ALPINA_AGENTE_COMERCIAL = process.env.ALPINA_AGENTE_COMERCIAL;

if (!ALPINA_CLIENTE_ID || !ALPINA_AGENTE_COMERCIAL) {
  console.warn("⚠️ Faltan variables ALPINA_CLIENTE_ID o ALPINA_AGENTE_COMERCIAL en el .env");
}

