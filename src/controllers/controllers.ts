import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { createCompanyService } from '../services/create/create';
import { getAllCompaniesService, getCategoryService, getCompanyByIdService, getCompanySizeService, getPaymentMethodService } from '../services/find/find';
import { toggleCompanyStatusService, updateCompanyService } from '../services/update/update';
import { Company } from '../models/company';
import { errorResponse, successResponse } from '../utils/bodyResponseApi';
import { InferCreationAttributes } from 'sequelize';

const SUCCESS_MESSAGES = {
  companiesList: 'Listado de empresas encontrados',
  companySizesList: 'Listado de tamaños de empresas encontrados',
  categoriesList: 'Listado de categorias encontrados',
  paymentMethodsList: 'Listado de metodos de pago encontrados',
  companyFound: (id: string) => `Resultado de la búsqueda con el ID ${id}`,
  companyCreated: 'Empresa creada con éxito',
  companyUpdated: 'Empresa actualizada correctamente',
  companyNoUpdated: 'No se realizaron cambios en la empresa',
  companyStatusToggled: 'Estado de la empresa actualizado correctamente',
  companyFoundEmail: (email: string) => `Resultado de la búsqueda con el correo ${email}`,
};

export const getAllCompaniesController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const companies = await getAllCompaniesService(req.body);
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.companiesList, data: companies }));
});

export const getCompanyByIdController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const company = await getCompanyByIdService({ id: Number(id) });
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.companyFound(id), data: company }));
});

export const createCompanyController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const {
    commercialName,
    fiscalName,
    representativeFirstName,
    representativeLastName,
    ruc,
    contactNumber,
    corporateEmail,
    address,
    companySizeId,
    categoryId,
    activeWorkers,
    website,
    description,
    // logoImageId,
    // backgroundImageId,
    mapUrl,
    paymentMethodId,
    countryId,
    createdBy,
  } = req.body;

  const companyData: InferCreationAttributes<
    Company,
    {
      omit:
        | 'id'
        | 'createdAt'
        | 'updatedAt'
        | 'isActive'
        | 'updatedBy'
        | 'paymentMethod'
        | 'category'
        | 'companySize'
        | 'country';
    }
  > = {
    commercialName,
    fiscalName,
    representativeFirstName,
    representativeLastName,
    ruc,
    contactNumber,
    corporateEmail,
    address,
    companySizeId: parseInt(companySizeId),
    categoryId: parseInt(categoryId),
    activeWorkers: parseInt(activeWorkers),
    website,
    description,
    // logoImageId: parseInt(logoImageId),
    // backgroundImageId: parseInt(backgroundImageId),
    mapUrl,
    paymentMethodId: parseInt(paymentMethodId),
    countryId: parseInt(countryId),
    createdBy: parseInt(createdBy),
  };

  const newCompany = await createCompanyService(companyData);
  res.status(201).json(successResponse({ message: SUCCESS_MESSAGES.companyCreated, data: newCompany }));
});

export const updateCompanyController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {
    commercialName,
    fiscalName,
    representativeFirstName,
    representativeLastName,
    contactNumber,
    corporateEmail,
    address,
    companySizeId,
    categoryId,
    activeWorkers,
    website,
    description,
    logoImageId,
    backgroundImageId,
    mapUrl,
    paymentMethodId,
    countryId,
    updatedBy
  } = req.body;

  const payload: Partial<Company> = { id };

  // Asignamos solo los campos que fueron enviados en la solicitud
  if (commercialName) payload.commercialName = commercialName;
  if (fiscalName) payload.fiscalName = fiscalName;
  if (representativeFirstName) payload.representativeFirstName = representativeFirstName;
  if (representativeLastName) payload.representativeLastName = representativeLastName;
  if (contactNumber) payload.contactNumber = contactNumber;
  if (corporateEmail) payload.corporateEmail = corporateEmail;
  if (address) payload.address = address;
  if (companySizeId) payload.companySizeId = companySizeId;
  if (categoryId) payload.categoryId = categoryId;
  if (activeWorkers) payload.activeWorkers = activeWorkers;
  if (website) payload.website = website;
  if (description) payload.description = description;
  if (logoImageId) payload.logoImageId = logoImageId;
  if (backgroundImageId) payload.backgroundImageId = backgroundImageId;
  if (mapUrl) payload.mapUrl = mapUrl;
  if (paymentMethodId) payload.paymentMethodId = paymentMethodId;
  if (countryId) payload.countryId = countryId;
  if (updatedBy) payload.updatedBy = updatedBy;

  const wasUpdated = await updateCompanyService(payload);

  if (!wasUpdated) {
    res.status(400).json(errorResponse({ message: SUCCESS_MESSAGES.companyNoUpdated }));
    return;
  }

  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.companyUpdated }));
});

export const toggleCompanyStatusController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { updatedBy } = req.body;
  const result = await toggleCompanyStatusService({ id: parseInt(id), updatedBy: parseInt(updatedBy) });

  if (!result.status) {
    res.status(400).json(errorResponse({ message: result.message }));
    return;
  }

  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.companyStatusToggled }));
});
// Controller for fetching company sizes
export const getCompanySizeController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const companySizes = await getCompanySizeService();
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.companySizesList, data: companySizes }));
});

// Controller for fetching categories
export const getCategoryController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const categories = await getCategoryService();
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.categoriesList, data: categories }));
});

// Controller for fetching payment methods
export const getPaymentMethodController = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const paymentMethods = await getPaymentMethodService();
  res.status(200).json(successResponse({ message: SUCCESS_MESSAGES.paymentMethodsList, data: paymentMethods }));
});

