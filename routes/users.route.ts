import {Request, Response, Router} from "express";
import UserService from "../services/user.service";





const router = Router();

router.get('/', [], async (req:Request, res: Response)=>{
    const search = req.query.search || null;
    const returnedResponse = await UserService.getAllUsers(search);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});


router.get('/:id', [], async (req:Request, res: Response) =>{
    const returnedResponse = await UserService.getSingleUser(req.params.id);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});



export default router;
