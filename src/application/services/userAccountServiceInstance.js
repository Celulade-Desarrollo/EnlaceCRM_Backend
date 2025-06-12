import { UserAccountAdapter } from "../../infrastructure/adapters/UserAccountAdapter";

// Instancia que usa el adaptador para un servicio 
export const userAccountService = new UserAccountAdapter()