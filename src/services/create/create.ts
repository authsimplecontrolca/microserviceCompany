// services/create/createCompany.ts
import { Company } from '../../models/company';

export const createCompanyService = async (payload: Partial<Company>) => {
  try {
    const { dataValues } = await Company.create(payload as Company , { raw: true });
    return dataValues;
  } catch (error: any) {
    console.log({error});
    
    throw new Error(`Error al crear la empresa: ${error.message}`);
  }
};
