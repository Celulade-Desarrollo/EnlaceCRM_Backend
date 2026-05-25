import fetch from 'node-fetch';

export async function fetchLoginAlpina() {
    const url = process.env.ALPINA_AUTH_URL;
  
    const data = {
      username: process.env.ALPINA_AUTH_USERNAME,
      password: process.env.ALPINA_AUTH_PASSWORD
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data )
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
      }
  
      const result = await response.json();
  
      if (!result?.token) {
        throw new Error("No se recibió un token válido desde el login de Alpina");
      }
  
      return result.token;
  
    } catch (error) {
      console.error('Error al hacer el POST a /auth:', error);
      throw error;
    }
  }
  