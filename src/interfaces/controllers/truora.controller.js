import { setStatusProcessUseCase } from "../../application/usecases/truora/setStatusProcessUseCase.js";
const setStatusProcess = async (req, res) => {
  try {
    const {process_id}=  req.params;
    await setStatusProcessUseCase(process_id);
    res.status(200); 
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};

export { setStatusProcess };
