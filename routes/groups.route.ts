import {Request, Response, Router} from "express";
import GroupService from "../services/group.service";
import {validateNewGroup, validateDeleteGroup, validateUpdateGroup} from '../middlewares/body_validations/group.request.validations.middleware';

const router = Router();

router.get('/', [], async (req:Request, res: Response)=>{
    const search = req.query.search || null;
    const showDeleted  = req.query.showDeleted === 'true';
    const returnedResponse = await GroupService.getAllGroups(search, showDeleted);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

router.get('/:id', [], async (req:Request, res: Response)=>{
    const returnedResponse = await GroupService.getSingleGroup(req.params.id);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});


router.post('/', [validateNewGroup], async (req:Request, res: Response)=>{
    // @ts-ignore
    const returnedResponse = await GroupService.newGroup(req.user._id, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

router.put('/:id', [validateUpdateGroup], async (req:Request, res: Response)=>{
    // @ts-ignore
    const returnedResponse = await GroupService.updateGroup(req.user._id, req.params.id,req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

router.put('/:id/delete', [validateDeleteGroup], async (req:Request, res: Response)=>{
    // @ts-ignore
    const returnedResponse = await GroupService.setDeleted(req.user._id, req.params.id,req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

export default router;
