import {Request, Response, Router} from "express";
import UserService from "../services/user.service";
import { validateUserRegister }  from '../middlewares/body_validations/register.request.validation.middleware';
import {validateQueryToken} from "../middlewares/validate_query_token.middleware";


const router = Router();

router.post('/', [validateUserRegister], async (req:Request, res: Response) =>{
    const returnedResponse = await UserService.registerUser(req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

router.get('/validate', [validateQueryToken], async (req:Request, res: Response) =>{
    // @ts-ignore
    const returnedResponse = await UserService.setValidated(req.userId, {isValidated: true});
    return res.status(returnedResponse.status).json(returnedResponse.response);
});


export default router;
