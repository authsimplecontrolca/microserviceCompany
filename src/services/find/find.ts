// services/find/getAllCompanies.ts
import { Company } from '../../models/company';
import { QueryTypes } from 'sequelize';
import { CompanySize } from '../../models/companySize';
import { Category } from '../../models/category';
import { PaymentMethod } from '../../models/paymentMethod';

export const getAllCompaniesService = async ({
  dateInit,
  dateEnd,
  isActive,
  search,
  categoryId,
  companySizeId,
  countryId,
  page = 1,
  limit = 10,
  order = 'DESC',
}: {
  dateInit: string;
  dateEnd: string;
  isActive: boolean;
  search: string;
  categoryId: number;
  companySizeId: number;
  countryId: number;
  page?: number;
  limit?: number;
  order?: string;
}) => {
  try {
    const offset = (page - 1) * limit;
    const query = `
      SELECT 
        c.id, 
        c.commercialName, 
        c.fiscalName, 
        c.representativeFirstName, 
        c.representativeLastName, 
        c.ruc, 
        c.contactNumber, 
        c.corporateEmail, 
        c.address, 
        c.isActive, 
        c.activeWorkers, 
        c.website, 
        c.description, 
        c.logoImageId, 
        c.backgroundImageId, 
        c.mapUrl, 
        pm.paymentMethodName, 
        ctg.categoryName, 
        sr.sizeRange, 
        ct.countryName
      FROM companies as c
      INNER JOIN payment_methods AS pm on (c.paymentMethodId = pm.id)
      INNER JOIN categories AS ctg on (c.categoryId = ctg.id)
      INNER JOIN company_sizes AS sr on (c.companySizeId = sr.id)
      INNER JOIN countries AS ct on (c.countryId = ct.id)
      WHERE (:dateInit IS NULL OR c.createdAt >= :dateInit)
      AND (:dateEnd IS NULL OR c.createdAt <= :dateEnd)
      AND (:isActive IS NULL OR c.isActive = :isActive)
      AND (:search IS NULL OR (c.commercialName LIKE :search OR c.fiscalName LIKE :search))
      AND (:categoryId IS NULL OR c.categoryId = :categoryId)
      AND (:countryId IS NULL OR c.countryId = :countryId)
      AND (:companySizeId IS NULL OR c.companySizeId = :companySizeId)
      ORDER BY c.id ${order} LIMIT :limit OFFSET :offset
    `;

    const replacements = {
      dateInit: dateInit || null,
      dateEnd: dateEnd || null,
      isActive: isActive === undefined ? null : isActive,
      search: search ? `%${search}%` : null,
      categoryId: categoryId || null,
      companySizeId: companySizeId || null,
      countryId: countryId || null,
      limit: limit,
      offset: offset,
    };
    const companies = await Company.sequelize?.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM companies as c
      WHERE (:dateInit IS NULL OR c.createdAt >= :dateInit)
      AND (:dateEnd IS NULL OR c.createdAt <= :dateEnd)
      AND (:isActive IS NULL OR c.isActive = :isActive)
      AND (:search IS NULL OR (c.commercialName LIKE :search OR c.fiscalName LIKE :search))
      AND (:categoryId IS NULL OR c.categoryId = :categoryId)
      AND (:companySizeId IS NULL OR c.companySizeId = :companySizeId)
      AND (:countryId IS NULL OR c.countryId = :countryId)
    `;

    const totalResult: any = await Company.sequelize?.query(countQuery, {
      replacements,
      type: QueryTypes.SELECT,
    });

    const totalCompanies = totalResult && totalResult[0] ? totalResult[0].total : 0;

    return {
      companies,
      totalCompanies,
      totalPages: Math.ceil(totalCompanies / limit),
      currentPage: page,
      perPage: limit,
    };
  } catch (error: any) {
    throw new Error('Error al obtener las empresas: ' + error.message);
  }
};

export const getCompanyByIdService = async ({ id }: { id: number }) => {
  try {
    const query = `
      SELECT 
        c.id, 
        c.commercialName, 
        c.fiscalName, 
        c.representativeFirstName, 
        c.representativeLastName, 
        c.ruc, 
        c.contactNumber, 
        c.corporateEmail, 
        c.address, 
        c.isActive, 
        c.activeWorkers, 
        c.website, 
        c.description, 
        c.logoImageId,          
        c.backgroundImageId,    
        c.mapUrl, 
        c.paymentMethodId,
        c.categoryId,
        c.companySizeId,
        c.countryId,
        c.createdBy,
        c.updatedBy,
        pm.paymentMethodName,
        ctg.categoryName,
        sr.sizeRange,
        ct.countryName

      FROM companies as c
      INNER JOIN payment_methods AS pm on (c.paymentMethodId = pm.id)
      INNER JOIN categories AS ctg on (c.categoryId = ctg.id)
      INNER JOIN company_sizes AS sr on (c.companySizeId = sr.id)
      INNER JOIN countries AS ct on (c.countryId = ct.id)
     
      WHERE c.id = :id
    `;

    const company = await Company.sequelize?.query(query, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });

    return company![0];
  } catch (error: any) {
    throw new Error('Error al obtener la empresa: ' + error.message);
  }
};

// Service to get active company sizes
export const getCompanySizeService = async () => {
  return await CompanySize.findAll({ where: { isActive: true } });
};

// Service to get active categories
export const getCategoryService = async () => {
  return await Category.findAll({ where: { isActive: true } });
};

// Service to get active payment methods
export const getPaymentMethodService = async () => {
  return await PaymentMethod.findAll({ where: { isActive: true } });
};
