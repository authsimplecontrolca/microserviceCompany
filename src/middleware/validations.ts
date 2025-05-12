import { body } from 'express-validator';
import {
  commercialNameOptionalValidation,
  commercialNameValidation,
  emailOptionaValidation,
  emailValidation,
  fiscalNameOptionalValidation,
  fiscalNameValidation,
  phoneNumberOptionaValidation,
  phoneNumberValidation,
  rucOptionalValidation,
  rucValidation,
} from './findInfo';

export const createCompanyValidator = [
  // Validación de `commercialName`
  body('commercialName')
    .isString()
    .withMessage('El nombre comercial debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El nombre comercial no puede estar vacío.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre comercial debe tener entre 3 y 100 caracteres.')
    .bail(),

  // Validación de `fiscalName`
  body('fiscalName')
    .isString()
    .withMessage('El nombre fiscal debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El nombre fiscal no puede estar vacío.')
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre fiscal debe tener entre 3 y 100 caracteres.')
    .bail(),

  // Validación de `representativeFirstName`
  body('representativeFirstName')
    .isString()
    .withMessage('El primer nombre del representante debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El primer nombre del representante no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El primer nombre del representante debe tener entre 3 y 50 caracteres.')
    .bail(),

  // Validación de `representativeLastName`
  body('representativeLastName')
    .isString()
    .withMessage('El apellido del representante debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El apellido del representante no puede estar vacío.')
    .isLength({ min: 3, max: 50 })
    .withMessage('El apellido del representante debe tener entre 3 y 50 caracteres.')
    .bail(),

  // Validación de `ruc`
  ...rucValidation,

  // Validación de `contactNumber`
  ...phoneNumberValidation,

  // verifica que el nombre comercial no exista
  ...emailValidation,

  // verifica que el correo no exista
  ...commercialNameValidation,

  // verifica que el nombre fiscal  no exista
  ...fiscalNameValidation,

  // Validación de `address`
  body('address')
    .isString()
    .withMessage('La dirección debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('La dirección no puede estar vacía.')
    .isLength({ min: 10, max: 255 })
    .withMessage('La dirección debe tener entre 10 y 255 caracteres.')
    .bail(),

  // Validación de `companySizeId`
  body('companySizeId')
    .isInt({ min: 1 })
    .withMessage('El ID del tamaño de la empresa debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El ID del tamaño de la empresa no puede estar vacío.')
    .bail(),

  // Validación de `categoryId`
  body('categoryId')
    .isInt({ min: 1 })
    .withMessage('El ID de la categoría de la empresa debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El ID de la categoría no puede estar vacío.')
    .bail(),

  // Validación de `activeWorkers`
  body('activeWorkers')
    .isInt({ min: 0 })
    .withMessage('El número de trabajadores activos debe ser un número entero válido.')
    .notEmpty()
    .withMessage('El número de trabajadores activos no puede estar vacío.')
    .bail(),

  // Validación de `website`
  body('website')
    .isString()
    .withMessage('La página web debe ser una cadena de texto.')
    .optional()
    .isURL()
    .withMessage('La página web debe ser una URL válida.')
    .bail(),

  // Validación de `description`
  body('description')
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres.')
    .bail(),

  // // Validación de `logoImageId`
  // body('logoImageId')
  //   .isString()
  //   .withMessage('El ID de la imagen del logo debe ser una cadena de texto.')
  //   .optional()
  //   .bail(),

  // // Validación de `backgroundImageId`
  // body('backgroundImageId')
  //   .isString()
  //   .withMessage('El ID de la imagen de fondo debe ser una cadena de texto.')
  //   .optional()
  //   .bail(),

  // Validación de `mapUrl`
  body('mapUrl')
    .isString()
    .withMessage('La URL del mapa debe ser una cadena de texto.')
    .optional()
    .isURL()
    .withMessage('La URL del mapa debe ser una URL válida.')
    .bail(),

  // Validación de `countryId`
  body('countryId')
    .isInt({ min: 1 })
    .withMessage('El ID del pais de la empresa debe ser un número entero válido.')
    .optional()
    .bail(),

  body('createdBy')
    .notEmpty()
    .withMessage('El campo "createdBy" no puede estar vacío.')
    .isInt({ min: 1 })
    .withMessage('El campo "createdBy" debe ser un número entero positivo.')
    .bail(),
];

export const updateCompanyValidator = [
  // Validación de `commercialName`
  body('commercialName')
    .isString()
    .withMessage('El nombre comercial debe ser una cadena de texto.')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre comercial debe tener entre 3 y 100 caracteres.')
    .bail(),

  // Validación de `fiscalName`
  body('fiscalName')
    .isString()
    .withMessage('El nombre fiscal debe ser una cadena de texto.')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('El nombre fiscal debe tener entre 3 y 100 caracteres.')
    .bail(),

  // Validación de `representativeFirstName`
  body('representativeFirstName')
    .isString()
    .withMessage('El primer nombre del representante debe ser una cadena de texto.')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('El primer nombre del representante debe tener entre 3 y 50 caracteres.')
    .bail(),

  // Validación de `representativeLastName`
  body('representativeLastName')
    .isString()
    .withMessage('El apellido del representante debe ser una cadena de texto.')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('El apellido del representante debe tener entre 3 y 50 caracteres.')
    .bail(),

  // Validación de `ruc`
  ...rucOptionalValidation,

  // Validación de `contactNumber`
  ...phoneNumberOptionaValidation,

  // Validación de `corporateEmail`
  ...emailOptionaValidation,

  // valida el nombre fiscal
  ...fiscalNameOptionalValidation,

  // valida el nombre comercial
  ...commercialNameOptionalValidation,
  // Validación de `address`
  body('address')
    .isString()
    .withMessage('La dirección debe ser una cadena de texto.')
    .optional()
    .isLength({ min: 10, max: 255 })
    .withMessage('La dirección debe tener entre 10 y 255 caracteres.')
    .bail(),

  // Validación de `companySizeId`
  body('companySizeId')
    .isInt({ min: 1 })
    .withMessage('El ID del tamaño de la empresa debe ser un número entero válido.')
    .optional()
    .bail(),

  // Validación de `countryId`
  body('countryId')
    .isInt({ min: 1 })
    .withMessage('El ID del pais de la empresa debe ser un número entero válido.')
    .optional()
    .bail(),

  // Validación de `categoryId`
  body('categoryId')
    .isInt({ min: 1 })
    .withMessage('El ID de la categoría de la empresa debe ser un número entero válido.')
    .optional()
    .bail(),

  // Validación de `activeWorkers`
  body('activeWorkers')
    .isInt({ min: 0 })
    .withMessage('El número de trabajadores activos debe ser un número entero válido.')
    .optional()
    .bail(),

  // Validación de `website`
  body('website')
    .isString()
    .withMessage('La página web debe ser una cadena de texto.')
    .optional()
    .isURL()
    .withMessage('La página web debe ser una URL válida.')
    .bail(),

  // Validación de `description`
  body('description')
    .isString()
    .withMessage('La descripción debe ser una cadena de texto.')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('La descripción debe tener entre 10 y 500 caracteres.')
    .bail(),

  // // Validación de `logoImageId`
  // body('logoImageId')
  //   .isString()
  //   .withMessage('El ID de la imagen del logo debe ser una cadena de texto.')
  //   .optional()
  //   .bail(),

  // // Validación de `backgroundImageId`
  // body('backgroundImageId')
  //   .isString()
  //   .withMessage('El ID de la imagen de fondo debe ser una cadena de texto.')
  //   .optional()
  //   .bail(),

  // Validación de `mapUrl`
  body('mapUrl')
    .isString()
    .withMessage('La URL del mapa debe ser una cadena de texto.')
    .optional()
    .isURL()
    .withMessage('La URL del mapa debe ser una URL válida.')
    .bail(),

  body('updatedBy')
    .notEmpty()
    .withMessage('El campo "updatedBy" no puede estar vacío.')
    .isInt({ min: 1 })
    .withMessage('El campo "updatedBy" debe ser un número entero positivo.')
    .bail(),
];

export const filterCompaniesValidator = [
  // Validación de fecha inicial
  body('dateInit')
    .optional()
    .isISO8601()
    .withMessage('Por favor, ingresa una fecha válida para la fecha inicial (formato: YYYY-MM-DD).')
    .bail(), // Detiene la validación si esta falla

  // Validación de fecha final
  body('dateEnd')
    .optional()
    .isISO8601()
    .withMessage('Por favor, ingresa una fecha válida para la fecha final (formato: YYYY-MM-DD).')
    .bail(), // Detiene la validación si esta falla

  // Validación de que ambas fechas deben ser proporcionadas o ninguna
  body('dateInit')
    .custom((value, { req }) => {
      const dateEnd = req.body.dateEnd;
      if ((value && !dateEnd) || (!value && dateEnd)) {
        throw new Error('Si decides incluir una fecha inicial, también debes incluir una fecha final, o viceversa.');
      }
      return true;
    })
    .bail(), // Detiene la validación si esta falla

  // Validación de que la fecha inicial no sea mayor que la final si ambas existen
  body('dateInit')
    .custom((value, { req }) => {
      const dateEnd = req.body.dateEnd;
      if (dateEnd && value && new Date(value) > new Date(dateEnd)) {
        throw new Error('La fecha inicial no puede ser posterior a la fecha final.');
      }
      return true;
    })
    .bail(), // Detiene la validación si esta falla

  // Validación del estado
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage("El estado debe ser 'true' o 'false'. Por favor, elige uno de estos valores.")
    .bail(), // Detiene la validación si esta falla

  // Validación del parámetro de búsqueda
  body('search')
    .optional()
    .isString()
    .withMessage('El parámetro de búsqueda debe ser una palabra o frase.')
    .isLength({ min: 1, max: 100 })
    .withMessage('El texto de búsqueda debe tener entre 1 y 100 caracteres.')
    .bail(), // Detiene la validación si esta falla

  // Validación del rol
  body('cotegoryID')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Por favor, selecciona una categoria válida, con un número entero mayor que 0.')
    .bail(), // Detiene la validación si esta falla

  body('order')
    .optional()
    .isIn(['DESC', 'ASC'])
    .withMessage("El parámetro 'order' solo puede ser 'ASC' o 'DESC'.")
    .bail(), // Detiene la validación si esta falla

  body('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage("El parámetro 'limit' debe ser un número entero mayor o igual a 1.")
    .bail(), // Detiene la validación si esta falla

  body('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage("El parámetro 'page' debe ser un número entero mayor o igual a 1.")
    .bail(), // Detiene la validación si esta falla
];
