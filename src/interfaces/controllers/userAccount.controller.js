import { getAllUserAccountUseCase } from "../../application/usecases/userAccount/getAllUserAccountUseCase.js";
import { getUserAccountByIdFlujoRegistro } from "../../application/usecases/userAccount/getUserAccountByIdFlujoRegistroUseCase.js";
import { createUserAccountUseCase } from "../../application/usecases/userAccount/createUserAccountUseCase.js";
import { deleteUserUserAccountById } from "../../application/usecases/userAccount/deleteUserAccountByIdUseCase.js";

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
