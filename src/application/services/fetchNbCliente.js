export async function fetchNbCliente(nbCliente, nbAgenteComercial, bearerToken) {
    const url = 'https://qa-client-gateway-general.amovil.com.co:42281/clients/bancoW';
  
    const data = {
      nbAgenteComercial: nbAgenteComercial,
      nbCliente: nbCliente
    };

  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Respuesta del servidor:', result);
  
      return result.data[0].documento; 
  
    } catch (error) {
      console.error('Error al hacer el POST:', error);
    }
  }
  