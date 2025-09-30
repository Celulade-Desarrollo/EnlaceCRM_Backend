import { Transaccion } from '../../../domain/models/Transaccion.js';

export class GetTransaccionByIdUseCase {
  constructor(transaccionesPort) {
    this.transaccionesPort = transaccionesPort;
  }
  
  async ejecutar(id) {
    if (!id) {
      throw new Error('El ID de la transacción es requerido');
    }
    
    if (isNaN(parseInt(id))) {
      throw new Error('El ID debe ser un número válido');
    }
    
    try {
      const transaccionData = await this.transaccionesPort.obtenerPorIdMovimiento(parseInt(id));
      
      if (!transaccionData) {
        throw new Error('Transacción no encontrada');
      }
      
      return new Transaccion({
        id: transaccionData.id,
        cedula: transaccionData.cedula,
        codigoTransaccion: transaccionData.id,
        codigoFactura: transaccionData.factura,
        valor: transaccionData.valor,
        fecha: transaccionData.fecha,
        hora: transaccionData.hora
      });
      
    } catch (error) {
      throw new Error(`Error al obtener transacción: ${error.message}`);
    }
  }
}

// Función exportada para mantener compatibilidad
export async function getTransaccionById(id, transaccionesPort) {
  const useCase = new GetTransaccionByIdUseCase(transaccionesPort);
  return await useCase.ejecutar(id);
}

// src/application/usecases/transacciones/exportTransaccionesExcelUseCase.js
export class ExportTransaccionesExcelUseCase {
  constructor(transaccionesPort) {
    this.transaccionesPort = transaccionesPort;
  }
  
  async ejecutar() {
    try {
      const transaccionesData = await this.transaccionesPort.obtenerParaExcel();
      
      // Lógica de negocio: formato de exportación
      return transaccionesData.map(transaccion => ({
        'Codigo Tendero (Cedula)': transaccion['Codigo Tendero (Cedula)'],
        'Codigo Transaccion': transaccion['Codigo Transaccion'],
        'Codigo Factura': transaccion['Codigo Factura'],
        'Valor Autorizado Pago': transaccion['Valor Autorizado Pago'],
        'Fecha': transaccion['Fecha'],
        'Hora': transaccion['Hora']
      }));
      
    } catch (error) {
      throw new Error(`Error al preparar datos para Excel: ${error.message}`);
    }
  }
}
