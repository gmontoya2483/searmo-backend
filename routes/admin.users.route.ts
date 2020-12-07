import {Request, Response, Router} from "express";

import  {
    validateUserActive,
    validateUserAdministrator,
    validateUserDelete,
    validateUserUpdate,
    validateUserValidate
} from '../middlewares/body_validations/admin.user.request.validations.middleware';

import UserService from "../services/user.service";


const router = Router();

// Marcar un usuario como validado o no validado
router.put('/:id/validate', [validateUserValidate], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setValidated(req.params.id, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

// Marcar un usuario como activo o inactivo
router.put('/:id/active', [validateUserActive], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setActivated(req.params.id, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

// Marcar un usuario como eliminado o no eliminado
router.put('/:id/delete', [validateUserDelete], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setDeleted(req.params.id, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});


// Marcar un usuario como Administrador
router.put('/:id/administrator', [validateUserAdministrator], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setAdmin(req.params.id, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

// Modificar un usuario
router.put('/:id', [validateUserUpdate], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.updateUser(req.params.id, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

export default router;
