export async function fetchNbCliente(nbCliente, nbAgenteComercial) {
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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoiYWxwaW5hYmFuY293QGFscGluYS5jb20iLCJpYXQiOjE3NTA5Njg0MzksImV4cCI6MTc1MDk3MjAzOX0.19VD9S3FvwiBRB3kF84WHiQniFHCN8liX65T3jvciow'
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
  