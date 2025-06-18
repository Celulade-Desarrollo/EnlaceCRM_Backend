export default class UbicacionService {
  constructor(repository) {
    this.repository = repository;
  }

  async obtenerDepartamentos() {
    return await this.repository.getDepartamentos();
  }

  async obtenerCiudades(idDepartamento) {
    return await this.repository.getCiudadesByDepartamento(idDepartamento);
  }

  async obtenerBarrios(idCiudad) {
    return await this.repository.getBarriosByCiudad(idCiudad);
  }
}
