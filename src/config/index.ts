import { Sequelize } from "sequelize-typescript";
import { Category } from "../models/category";
import { Company } from "../models/company";
import { CompanySize } from "../models/companySize";
import { Country } from "../models/country";
import { PaymentMethod } from "../models/paymentMethod";
import { activeModels } from "./activeModel";


const models: any[] = [];

// Solo agrega los modelos que están activos en activeModels
// Solo agrega los modelos que están activos en activeModels

if (activeModels.PaymentMethod === 'on') models.push(PaymentMethod);
if (activeModels.Category === 'on') models.push(Category);
if (activeModels.CompanySize === 'on') models.push(CompanySize);
if (activeModels.Company === 'on') models.push(Company);
if (activeModels.Country === 'on') models.push(Country);
// Agrega más modelos aquí si es necesario

export const registerModels = (sequelize: Sequelize) => {
  console.log(
    '📦 Modelos activos:',
    models.map((m) => m.name)
  ); // Imprime los modelos que se están registrando
  sequelize.addModels(models);
};
