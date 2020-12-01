import {Request, Response, Router} from "express";
const validateUserValidate = require('../middlewares/body_validations/admin/users/validate.request.validation.middleaware');
const validateUserActive = require('../middlewares/body_validations/admin/users/active.request.validation.middleware');
const validateUserDelete = require('../middlewares/body_validations/admin/users/delete.request.validation.middleware');
const validateUserAdmin = require('../middlewares/body_validations/admin/users/admin.request.validation.middleware');
const validateUser = require('../middlewares/body_validations/admin/users/request.validation.middleware');
import UserService from "../services/user.service";


const router = Router();

// Marcar un usuario como validado o no validado
router.put('/:id/validate', [validateUserValidate], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setValidated(req.params.id, req.body);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});

// Marcar un usuario como activo o inactivo
router.put('/:id/active', [validateUserActive], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setActivated(req.params.id, req.body);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});

// Marcar un usuario como eliminado o no eliminado
router.put('/:id/delete', [validateUserDelete], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setDeleted(req.params.id, req.body);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});


// Marcar un usuario como Administrador
router.put('/:id/administrator', [validateUserAdmin], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setAdmin(req.params.id, req.body);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});

// Modificar un usuario
router.put('/:id', [validateUser], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.updateUser(req.params.id, req.body);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});



export default router;
