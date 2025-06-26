import { loginUserAccountUseCase } from "../../application/usecases/userAccount/loginUserAccountUseCase.js";

async function loginUserAccount(req,res){
  const {nbCliente, nbAgenteComercial, token} =  req.body
  try {
     const data = await loginUserAccountUseCase(nbCliente, nbAgenteComercial, token)
     if (!data) {
      return res.status(404).json({ mensaje: "Falló loginUserAccountUseCase" });
    } res.json(data)
    
  } catch (err) {
    return res.status(500).send(err.message)
  }
}


export{
  loginUserAccount
}
