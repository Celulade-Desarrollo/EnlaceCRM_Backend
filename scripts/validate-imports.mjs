(async () => {
  try {
    await import('../src/application/usecases/flujoRegistro/createFlujoRegistroUseCase.js');
    await import('../src/application/usecases/flujoRegistro/updateFlujoRegistroTruoraUseCase.js');
    console.log('IMPORTS_OK');
    process.exit(0);
  } catch (e) {
    console.error('IMPORT_ERROR');
    console.error(e);
    process.exit(1);
  }
})();
