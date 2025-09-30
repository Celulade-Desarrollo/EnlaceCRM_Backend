// src/infrastructure/services/ExcelExporter.js
import ExcelJS from "exceljs";

export class ExcelExporter {
  static async generarExcel(movimientos) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Movimientos");

    // Encabezados
    sheet.columns = [
      { header: "Cédula", key: "cedula", width: 15 },
      { header: "Nombre", key: "nombre", width: 20 },
      { header: "Apellido", key: "apellido", width: 20 },
      { header: "Código Transacción", key: "codigoTransaccionPropio", width: 20 },
      { header: "Factura", key: "codigoFactura", width: 15 },
      { header: "Valor", key: "valor", width: 15 },
      { header: "Fecha", key: "fecha", width: 15 },
      { header: "Hora", key: "hora", width: 10 },
    ];

    // Filas
    movimientos.forEach((m) => {
      sheet.addRow({
        cedula: m.cedula,
        nombre: m.nombre,
        apellido: m.apellido,
        codigoTransaccionPropio: m.codigoTransaccionPropio,
        codigoFactura: m.codigoFactura,
        valor: m.valor,
        fecha: m.fecha,
        hora: m.hora,
      });
    });

    // Buffer para enviar
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
