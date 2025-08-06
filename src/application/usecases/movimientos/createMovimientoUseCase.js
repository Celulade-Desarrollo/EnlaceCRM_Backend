import { movimientoRepository } from "../../../infrastructure/repositories/movimiento.repository.js";
import { EstadoCuenta } from "../../../domain/models/EstadoCuenta.js";
import { Factura } from "../../../domain/models/Factura.js";

class CreateMovimientoUseCase {
  async execute({ cedula, monto, facturasSeleccionadas, idMedioPago }) {
    const usuario = await movimientoRepository.findUsuarioFinalByCedula(cedula);

    if (!usuario) {
      throw new Error(`No se encontró ningún usuario con la cédula ${cedula}`);
    }

    if (usuario.estaBloqueadoPorMora) {
      throw new Error("El usuario está bloqueado por mora y no puede realizar pagos.");
    }

    if (monto < usuario.montoMinimoPago) {
      throw new Error(`El monto de pago (${monto}) es menor al mínimo permitido (${usuario.montoMinimoPago}).`);
    }

    const totalFacturas = facturasSeleccionadas.reduce((acc, f) => acc + f.montoCancelado, 0);
    if (monto > totalFacturas) {
      throw new Error("El monto del pago no puede exceder el total de las facturas seleccionadas.");
    }

    // ✅ Creamos el movimiento como un objeto tipo "movimiento" para insertarlo en EstadoCuenta
   const movimiento = {
      idUsuarioFinal: usuario.idUsuarioFinal,
      idTipoMovimiento: EstadoCuenta.MOVEMENT_TYPES.CREDIT, // Corregido
      idEstadoMovimiento: EstadoCuenta.MOVEMENT_STATES.ACTIVE, // Corregido
      monto: monto,
      descripcion: "Pago realizado por el tendero",
      fechaPagoProgramado: new Date(),
      idMedioPago: idMedioPago,
      bloqueoMora: usuario.estaBloqueadoPorMora ?? false,
      telefonoTransportista: null // o el valor correspondiente si aplica
    };

    // ✅ Creamos el modelo EstadoCuenta con movimientos
    const estadoCuenta = new EstadoCuenta({
      idUsuarioFinal: usuario.idUsuarioFinal,
      movimientos: [movimiento],
      cupoDisponible: usuario.cupoDisponible ?? 0,
      bloqueoPorMora: usuario.estaBloqueadoPorMora
    });

    // ✅ Creamos facturas (ya estaba bien esta parte)
    const facturas = facturasSeleccionadas.map((f) => new Factura({
      nroFacturaAlpina: f.nroFacturaAlpina,
      montoFacturaAlpina: f.montoFacturaAlpina,
      montoCancelado: f.montoCancelado,
    }));

    // ✅ Llamamos al repositorio
    return await movimientoRepository.crearMovimientoYFacturas(movimiento, facturas);
  }
}

export const createMovimientoUseCase = new CreateMovimientoUseCase();
