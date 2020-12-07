import {Request, Response, Router} from "express";
import UserService from "../services/user.service";
import  { validateAuth } from '../middlewares/body_validations/auth.request.validation.middleware';

const router = Router();


router.post('/', [validateAuth],async (req: Request, res: Response) => {
    const returnedResponse = await UserService.authenticateUser(req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

export default router;
