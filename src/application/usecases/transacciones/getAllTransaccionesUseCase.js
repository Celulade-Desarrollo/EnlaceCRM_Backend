import { Transaccion } from '../../../domain/models/Transaccion.js';

export class GetAllTransaccionesUseCase {
  constructor(transaccionesPort) {
    this.transaccionesPort = transaccionesPort;
  }
  
  async ejecutar() {
    try {
      const transaccionesData = await this.transaccionesPort.obtenerTodasTransacciones();
      
      // Convertir datos a entidades de dominio
      const transacciones = transaccionesData.map(data => new Transaccion({
        id: data.id,
        cedula: data.cedula,
        codigoTransaccion: data.id, // Usando id como código de transacción
        codigoFactura: data.factura,
        valor: data.valor,
        fecha: data.fecha,
        hora: data.hora
      }));
      
      // Lógica de negocio: ordenamiento por fecha descendente
      return transacciones.sort((a, b) => 
        new Date(b.obtenerFechaCompleta()) - new Date(a.obtenerFechaCompleta())
      );
      
    } catch (error) {
      throw new Error(`Error al obtener transacciones: ${error.message}`);
    }
  }
}

// Función exportada para mantener compatibilidad con tu código actual
export async function getAllTransacciones(transaccionesPort) {
  const useCase = new GetAllTransaccionesUseCase(transaccionesPort);
  return await useCase.ejecutar();
}
