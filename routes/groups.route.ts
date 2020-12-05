import {Request, Response, Router} from "express";
import GroupService from "../services/group.service";
import UserService from "../services/user.service";

const validateNewGroup = require('../middlewares/body_validations/new.group.request.validation.middleware');
const router = Router();

router.get('/', [], async (req:Request, res: Response)=>{

    return res.json("Lista de gropos");
});

router.get('/:id', [], async (req:Request, res: Response)=>{
    return res.json(`Grupo con el id: ${req.params.id}`);
});


router.post('/', [validateNewGroup], async (req:Request, res: Response)=>{
    // @ts-ignore
    const returnedResponse = await GroupService.newGroup(req.user._id, req.body);
    (returnedResponse.ok) ? res.status(201) : res.status(400);
    res.json(returnedResponse);
});

router.put('/:id', [], async (req:Request, res: Response)=>{
    return res.json(`Modificar grupo con el id: ${req.params.id}`);
});

router.put('/:id/delete', [], async (req:Request, res: Response)=>{
    return res.json(`Marcar como borrado el grupo con el id: ${req.params.id}`);
});







export default router;
