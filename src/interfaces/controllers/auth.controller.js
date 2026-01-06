import { loginAdminAccountUseCase } from "../../application/usecases/adminAccount/loginAdminAccountUseCase.js";
import { loginUserAccountUseCase } from "../../application/usecases/userAccount/loginUserAccountUseCase.js";

async function loginUserAccount(req, res) {
  const { nbCliente, nbAgenteComercial, token } = req.body;
  try {
    const data = await loginUserAccountUseCase(nbCliente, nbAgenteComercial, token);
    
    if (!data) {
      return res.status(404).json({ mensaje: "Falló loginUserAccountUseCase" });
    }
    return res.status(200).json(data);

  } catch (err) {
    if (err.status === 207 && err.payload) {
      return res.status(207).json(err.payload);
    }
    return res.status(err.status || 500).json({ message: err.message });
  }
};

async function loginAdminAccount(req,res){
  const {Password, Cedula} = req.body
  try {
    const data = await loginAdminAccountUseCase(Cedula,Password)
    if(!data){
      return res.status(404).json({ mensaje: "Falló loginAdminAccount" });
    } res.json(data)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}


export{
  loginUserAccount,
  loginAdminAccount
}
