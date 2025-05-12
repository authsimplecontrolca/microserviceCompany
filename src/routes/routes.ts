import { Router } from 'express';
import { createCompanyValidator, filterCompaniesValidator, updateCompanyValidator } from '../middleware/validations';
import { allValidator } from '../utils/expressValidator';
import { createCompanyController, getAllCompaniesController, getCategoryController, getCompanyByIdController, getCompanySizeController, getPaymentMethodController, toggleCompanyStatusController, updateCompanyController } from '../controllers/controllers';
import { idValidation } from '../middleware/findInfo';


export const router: Router = Router();

// Crear una nueva empresa
router.post('/create', createCompanyValidator, allValidator, createCompanyController);

// Obtener una empresa por ID
router.get('/find/:id', idValidation, allValidator, getCompanyByIdController);

// Obtener todas las empresas
router.get('/all', filterCompaniesValidator, allValidator, getAllCompaniesController);

// Deshabilitar y habilitar una empresa por ID
router.put('/toggle/:id', idValidation, allValidator, toggleCompanyStatusController);

// Actualizar una empresa por ID
router.put('/update/:id', idValidation, updateCompanyValidator, allValidator, updateCompanyController);

// ------------ tamaños de empresa ------------
router.get('/companySize', getCompanySizeController);

// ------------ categorías de empresa ------------
router.get('/category', allValidator, getCategoryController);

// ------------ métodos de pago ------------
router.get('/paymentMethod', allValidator, getPaymentMethodController);
