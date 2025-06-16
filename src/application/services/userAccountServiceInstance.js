import { UserAccountAdapter } from "../../infrastructure/adapters/UserAccountAdapter.js";

// Instancia que usa el adaptador para un servicio 
export const userAccountService = new UserAccountAdapter()