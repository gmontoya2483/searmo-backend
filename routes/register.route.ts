import {Request, Response, Router} from "express";
import UserService from "../services/user.service";
import { validateUserRegister }  from '../middlewares/body_validations/register.request.validation.middleware';



const router = Router();

router.post('/', [validateUserRegister], async (req:Request, res: Response) =>{
    const returnedResponse = await UserService.registerUser(req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});


export default router;
