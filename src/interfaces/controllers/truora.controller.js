import { truoraCedulaUseCase } from "../../application/usecases/truora/truoraCedulaUseCase.js";
const truoraInfo = async (req, res) => {
  try {
    const {document_number} = req.body;
    await truoraCedulaUseCase(document_number);
    res.status(200); 
  } catch (err) {
    res.status(500).send({message: "No se encontró un registro con la cédula proporcionada."}); 
  }
};

export { truoraInfo };
