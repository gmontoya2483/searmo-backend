import {Request, Response, Router} from "express";
import UserService from "../services/user.service";
const validateAuth = require('../middlewares/body_validations/auth.request.validation.middleware');

const router = Router();


router.post('/', [validateAuth],async (req: Request, res: Response) => {
    const returnedResponse = await UserService.authenticateUser(req.body);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});

export default router;
