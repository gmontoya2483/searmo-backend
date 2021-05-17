import {Request, Response, Router} from "express";
import {
    validateDeleteGroupMatch,
    validateNewGroupMatch
} from "../middlewares/body_validations/group_match.request.validation.middleware";
import {isGroupAdmin} from "../middlewares/group_admin.middleware";
import GroupMatchService from "../services/group_match.service";
import GroupMemberService from "../services/group_member.service";


const router = Router({mergeParams: true});


router.get('/', [], async (req:Request, res: Response)=>{
    const showDeleted  = req.query.showDeleted === 'true';
    const returnedResponse = await GroupMatchService.getAllMatches(req.params.groupId, showDeleted);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});


router.get('/:matchId', [], async (req:Request, res: Response)=>{
    const returnedResponse = await GroupMatchService.getSingleMatch(req.params.groupId, req.params.matchId);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

router.post('/', [isGroupAdmin, validateNewGroupMatch], async (req:Request, res: Response)=>{
    const returnedResponse = await GroupMatchService.newGroupMatch(req.params.groupId, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

router.put('/:matchId/delete', [isGroupAdmin, validateDeleteGroupMatch], async (req:Request, res: Response)=>{
    const returnedResponse = await GroupMatchService.setDeleted(req.params.groupId, req.params.matchId, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});


export default router;
