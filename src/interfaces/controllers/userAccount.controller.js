import { getAllUserAccountUseCase } from "../../application/usecases/userAccount/getAllUserAccountUseCase.js";
import { getUserAccountByIdFlujoRegistro } from "../../application/usecases/userAccount/getUserAccountByIdFlujoRegistroUseCase.js";
import { createUserAccountUseCase } from "../../application/usecases/userAccount/createUserAccountUseCase.js";
import { deleteUserUserAccountById } from "../../application/usecases/userAccount/deleteUserAccountByIdUseCase.js";
import { verifyUserAccountTypeUseCase } from "../../application/usecases/userAccount/verifyUserAccountTypeUseCase.js";

export async function AccountType(req, res){
  const Cedula = req.params.Cedula

  try {
     const result = await verifyUserAccountTypeUseCase(Cedula)
     if (!result) return res.status(404).json({ message: "Usuario no encontrado" });
     if(result) return res.status(200).json({
      tipo: "usuario",
      usuario: result
     })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllUserAccounts(req, res) {
  try {
    const data = await getAllUserAccountUseCase();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserAccountById(req, res) {
  try {
    const data = await getUserAccountByIdFlujoRegistro(req.params.id);
    if (!data) return res.status(404).json({ message: "No encontrado" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createUserAccount(req, res) {
  try {
    const result = await createUserAccountUseCase(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUserAccountById(req, res) {
  try {
    const result = await deleteUserUserAccountById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
