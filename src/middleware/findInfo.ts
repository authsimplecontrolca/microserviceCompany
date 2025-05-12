import { param, body } from 'express-validator';
import { Company } from '../models/company';

// valida que la empresa  exista.
export const idValidation = [
  param('id')
    .isNumeric()
    .withMessage('El ID debe ser un número')
    .custom(async (id) => {
      const company = await Company.findByPk(id);
      if (!company) {
        throw new Error(`La empresa con el ID ${id} no se encuentra.`);
      }
    })
    .bail(),
];

export const rucValidation = [
  body('ruc')
    .isString()
    .withMessage('El RUC debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El RUC no puede estar vacío.')
    .isLength({ min: 11, max: 11 })
    .withMessage('El RUC debe tener 11 caracteres.')
    .custom(async (ruc) => {
      const is_exist = await Company.findOne({ where: { ruc } });
      if (is_exist) throw new Error('Ya existe una empresa con este ruc');
    })
    .bail(),
];

// valida que el email este disponible
export const emailValidation = [
  body('corporateEmail')
    .notEmpty()
    .withMessage('El correo no puede ser vacio.')
    .isEmail()
    .withMessage('Debe ser un correo válido')
    .custom(async (corporateEmail) => {
      const existingCompany = await Company.findOne({ where: { corporateEmail } });
      if (existingCompany) {
        throw new Error(`El correo ${corporateEmail} está asociado a una empresa , intente con un correo diferente.`);
      }
    })
    .bail(),
];

// verifica si el número de telefono esta libre.
export const phoneNumberValidation = [
  body('contactNumber')
    .notEmpty()
    .withMessage('El número de teléfono no puede estar vacío.')
    .isLength({ min: 7, max: 15 })
    .isString()
    .withMessage('El número de teléfono debe ser una cadena de texto válida')
    .custom(async (contactNumber) => {
      const existingCompany = await Company.findOne({ where: { contactNumber } });
      if (existingCompany) {
        throw new Error(
          `El número de teléfono ${contactNumber} está asociado a una empresa, intente con un número de teléfono diferente.`
        );
      }
    })
    .bail(),
];
// verifica si el nombre comercial esta libre.
export const commercialNameValidation = [
  body('commercialName')
    .notEmpty()
    .withMessage('El nombre comercial no puede ser vacío.')
    .isString()
    .withMessage('El nombre comercial debe ser una cadena de texto.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre comercial debe tener entre 3 y 100 caracteres.')
    .custom(async (commercialName) => {
      const existingCompany = await Company.findOne({ where: { commercialName } });
      if (existingCompany) {
        throw new Error(`El nombre comercial ${commercialName} ya está en uso, intente con otro.`);
      }
    })
    .bail(),
];
// verifica si el nombre  fiscal esta libre.
export const fiscalNameValidation = [
  body('fiscalName')
    .notEmpty()
    .withMessage('El nombre fiscal no puede ser vacío.')
    .isString()
    .withMessage('El nombre fiscal debe ser una cadena de texto.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre fiscal debe tener entre 3 y 100 caracteres.')
    .custom(async (fiscalName) => {
      const existingCompany = await Company.findOne({ where: { fiscalName } });
      if (existingCompany) {
        throw new Error(`El nombre fiscal ${fiscalName} ya está en uso, intente con otro.`);
      }
    })
    .bail(),
];

// #################################### versiones opcionales  ###########################################################

// valida que el email este disponible
export const emailOptionaValidation = [
  body('corporateEmail')
    .optional()
    .notEmpty()
    .withMessage('El correo no puede ser vacio.')
    .isEmail()
    .withMessage('Debe ser un correo válido')
    .custom(async (corporateEmail) => {
      const existingCompany = await Company.findOne({ where: { corporateEmail } });
      if (existingCompany) {
        throw new Error(`El correo ${corporateEmail} está asociado a una empresa, intente con un correo diferente.`);
      }
    })
    .bail(),
];

// verifica si el número de telefono esta libre.
export const phoneNumberOptionaValidation = [
  body('contactNumber')
    .optional()
    .isLength({ min: 7, max: 15 })
    .isString()
    .withMessage('El número de teléfono debe ser una cadena de texto válida')
    .custom(async (contactNumber) => {
      const existingCompany = await Company.findOne({ where: { contactNumber } });
      if (existingCompany) {
        throw new Error(
          `El número de teléfono ${contactNumber} está asociado a una empresa, intente con un número de teléfono diferente.`
        );
      }
    })
    .bail(),
];
export const rucOptionalValidation = [
  body('ruc')
    .optional()
    .isString()
    .withMessage('El RUC debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El RUC no puede estar vacío.')
    .isLength({ min: 11, max: 11 })
    .withMessage('El RUC debe tener 11 caracteres.')
    .custom(async (ruc) => {
      const is_exist = await Company.findOne({ where: { ruc } });
      if (is_exist) throw new Error('Ya existe una empresa con este ruc');
    })
    .bail(),
];
// verifica si el nombre comercial esta libre.
export const commercialNameOptionalValidation = [
  body('commercialName')
    .optional()
    .notEmpty()
    .withMessage('El nombre comercial no puede ser vacío.')
    .isString()
    .withMessage('El nombre comercial debe ser una cadena de texto.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre comercial debe tener entre 3 y 100 caracteres.')
    .custom(async (commercialName) => {
      const existingCompany = await Company.findOne({ where: { commercialName } });
      if (existingCompany) {
        throw new Error(`El nombre comercial ${commercialName} ya está en uso, intente con otro.`);
      }
    })
    .bail(),
];
// verifica si el nombre  fiscal esta libre.
export const fiscalNameOptionalValidation = [
  body('fiscalName')
    .optional()
    .notEmpty()
    .withMessage('El nombre fiscal no puede ser vacío.')
    .isString()
    .withMessage('El nombre fiscal debe ser una cadena de texto.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre fiscal debe tener entre 3 y 100 caracteres.')
    .custom(async (fiscalName) => {
      const existingCompany = await Company.findOne({ where: { fiscalName } });
      if (existingCompany) {
        throw new Error(`El nombre fiscal ${fiscalName} ya está en uso, intente con otro.`);
      }
    })
    .bail(),
];
