import dotenv from "dotenv";
dotenv.config(); // Cargar variables desde el `.env`

// Definimos el tipado para la configuración
interface Config {
  PORT: number;
}

const ENV = process.env.DEPLOYIN || "DEV"; // Si no se define, usa "DEV"

const devConfig: Config = {
  PORT: parseInt(process.env.PORT_DEV!),
};

const prodConfig: Config = {
  PORT: parseInt(process.env.PORT_DEV!),
};

// Seleccionar configuración según el entorno
export const config: Config = ENV === "PROD" ? prodConfig : devConfig;

console.log(`🔧 Configuración cargada para: ${ENV}`);
