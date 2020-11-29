import {Request, Response, Router} from "express";
const validateUserValidate = require('../middlewares/body_validations/admin.users.validate.request.validation.middleaware');
const validateUserActive = require('../middlewares/body_validations/admin.users.active.request.validation.middleware');
import UserService from "../services/user.service";


const router = Router();

router.put('/:id/validate', [validateUserValidate], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setValidated(req.params.id, req.body);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});

router.put('/:id/active', [validateUserActive], async (req:Request, res: Response)=>{
    const returnedResponse = await UserService.setActivated(req.params.id, req.body);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});

router.put('/:id/delete', [], (req:Request, res: Response)=>{
    res.json({
        ok: true,
        message: "delete user"
    });
});


router.put('/:id/administrator', [], (req:Request, res: Response)=>{
    res.json({
        ok: true,
        message: "inactivate user"
    });
});





export default router;
