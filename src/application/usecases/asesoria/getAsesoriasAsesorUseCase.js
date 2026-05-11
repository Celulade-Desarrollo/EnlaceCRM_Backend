// src/application/usecases/asesoria/getAsesoriasAsesorUseCase.js
import AsesoriaRepository from '../../../infrastructure/repositories/AsesoriaRepository.js';

export const getAsesoriasAsesorUseCase = async () => {
  return await AsesoriaRepository.getPendientes(); // ¡No olvides el return!
};