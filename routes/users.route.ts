import {Request, Response, Router} from "express";
import UserService from "../services/user.service";

const router = Router();

router.get('/', [], async (req:Request, res: Response)=>{
    const search = req.query.search || null;
    const showDeleted  = req.query.showDeleted === 'true';
    const returnedResponse = await UserService.getAllUsers(search, showDeleted);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});


router.get('/:id', [], async (req:Request, res: Response) =>{
    const returnedResponse = await UserService.getSingleUser(req.params.id);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

export default router;
