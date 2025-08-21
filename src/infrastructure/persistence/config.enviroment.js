import dotenv from "dotenv";
dotenv.config();
const ENV = process.env.NODE_ENV; 

export const DATABASE_SERVER = ENV === "prod" ? process.env.DB_SERVER 
    : ENV === "dev" ? process.env.DEV_DB_SERVER : console.error("No enviroment for DB")

setTimeout(()=>{
    if(ENV==="dev") console.log("You're conected to dev database EnlaceCRM ", DATABASE_SERVER)
}, 2000)

    