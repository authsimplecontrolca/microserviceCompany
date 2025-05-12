// services/update/updateCompany.ts
import { raw } from 'mysql2';
import { Company } from '../../models/company';

export const updateCompanyService = async (payload: Partial<Company>) => {
  try {
    const company = await Company.update(payload, { where: { id: payload.id } });
    return company[0] > 0; // Si el número de filas afectadas es mayor a 0, la actualización fue exitosa
  } catch (error: any) {
    throw new Error(`Error al actualizar la empresa: ${error.message}`);
  }
};

// services/update/toggleCompanyStatus.ts
export const toggleCompanyStatusService = async ({ id, updatedBy }: { id: number; updatedBy: number }) => {
  try {
    const company = await Company.findByPk(id, { raw: true });

    const companyUpdated = await Company.update({ isActive: !company!.isActive, updatedBy }, { where: { id } });

    if (companyUpdated[0] === 0) {
      return { status: false, message: `No se ha podido actualizar la empresa` };
    }

    return { status: true, message: `Estado de la empresa actualizado a ${company!.isActive ? 'activo' : 'inactivo'}` };
  } catch (error: any) {
    return { status: false, message: `Error al actualizar el estado de la empresa: ${error.message}` };
  }
};
