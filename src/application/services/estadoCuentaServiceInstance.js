import { EstadoCuentaAdapter } from "../../infrastructure/adapters/estadoCuentaAdapter.js";
import { EstadoCuentaPort } from "../../domain/ports/EstadoCuentaPort.js";

const estadoCuentaService = new EstadoCuentaPort(new EstadoCuentaAdapter());

export { estadoCuentaService };
