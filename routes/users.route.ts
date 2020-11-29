import {Request, Response, Router} from "express";
import UserService from "../services/user.service";





const router = Router();

router.get('/', [], (req:Request, res: Response)=>{
    res.json({
        ok: true,
        message: "Get all users"
    });
});


router.get('/:id', [], async (req:Request, res: Response) =>{
    const returnedResponse = await UserService.getUser(req.params.id);
    (returnedResponse.ok) ? res.status(200) : res.status(400);
    res.json(returnedResponse);
});



export default router;
