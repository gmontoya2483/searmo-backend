import {Request, Response, Router} from "express";
import UserService from "../services/user.service";
const validateUserRegister = require('../middlewares/body_validations/register.request.validation.middleware');



const router = Router();

router.post('/', [validateUserRegister], async (req:Request, res: Response) =>{
    const returnedResponse = await UserService.registerUser(req.body);
    (returnedResponse.ok) ? res.status(201) : res.status(400);
    res.json(returnedResponse);
});




export default router;
