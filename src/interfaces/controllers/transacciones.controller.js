import ExcelJS from "exceljs";
import { transaccionesService } from "../../application/services/transaccionesServiceInstance.js";
import { CodigoTransaccionService } from "../../application/services/CodigoTransaccionService.js";

/**
 * Obtener todas las transacciones
 */
export async function getAllTransacciones(req, res) {
  try {
    const data = await transaccionesService.obtenerTodas();
    res.status(200).json({
      success: true,
      data,
      message: "Transacciones obtenidas exitosamente"
    });
  } catch (err) {
    console.error("❌ Error getAllTransacciones:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * Crear nueva transacción
 */
export async function crearTransaccion(req, res) {
  try {
    const { cedula, valor, codigoFactura } = req.body;

    if (!cedula || !valor) {
      return res.status(400).json({ success: false, message: "Cédula y valor son requeridos" });
    }

    if (typeof valor !== "number" || valor <= 0) {
      return res.status(400).json({ success: false, message: "Valor inválido" });
    }

    // Generar código único por tendero
    const codigoTransaccionPropio = await CodigoTransaccionService.generarSiguienteCodigo(cedula);

    const datosTransaccion = {
      cedula,
      valor,
      codigoFactura: codigoFactura || null,
      codigoTransaccionPropio,
      fecha: new Date().toISOString().split("T")[0],
      hora: new Date().toTimeString().split(" ")[0]
    };

    const nuevaTransaccion = await transaccionesService.crear(datosTransaccion);

    res.status(201).json({
      success: true,
      data: nuevaTransaccion,
      message: "Transacción creada exitosamente"
    });
  } catch (err) {
    console.error("❌ Error crearTransaccion:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * Exportar Excel
 */
export async function exportTransaccionesExcel(req, res) {
  try {
    const transacciones = await transaccionesService.obtenerTodas();

    if (!transacciones || !transacciones.length) {
      return res.status(404).json({ success: false, message: "No hay transacciones para exportar" });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Transacciones");

    // 👇 aquí agregamos también nombre y apellido
    sheet.columns = [
      { header: "Cédula", key: "cedula", width: 20 },
      { header: "Nombre", key: "nombre", width: 20 },
      { header: "Apellido", key: "apellido1", width: 20 },
      { header: "Código Transacción", key: "codigoTransaccionPropio", width: 25 },
      { header: "Factura", key: "codigoFactura", width: 20 },
      { header: "Valor", key: "valor", width: 15 },
      { header: "Fecha", key: "fecha", width: 15 },
      { header: "Hora", key: "hora", width: 15 }
    ];

    transacciones.forEach(row => {
      sheet.addRow({
        cedula: row.cedula,
        nombre: row.nombre,
        apellido1: row.apellido1,
        codigoTransaccionPropio: row.codigoTransaccionPropio,
        codigoFactura: row.codigoFactura,
        valor: row.valor,
        fecha: row.fecha,
        hora: row.hora
      });
    });

    sheet.getColumn(6).numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=transacciones.xlsx");

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error("❌ Error exportTransaccionesExcel:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * Obtener por ID
 */
export async function getTransaccionById(req, res) {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    const transaccion = await transaccionesService.obtenerPorId(parseInt(id));
    if (!transaccion) return res.status(404).json({ success: false, message: "No encontrada" });

    res.status(200).json({ success: true, data: transaccion });
  } catch (err) {
    console.error("❌ Error getTransaccionById:", err);
    res.status(500).json({ success: false, message: err.message });
  }
}
