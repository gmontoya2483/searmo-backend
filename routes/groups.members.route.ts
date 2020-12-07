import {Request, Response, Router} from "express";
import {isGroupAdmin} from "../middlewares/group_admin.middleware";
import {validateNewGroupMember, validateDeleteGroupMember} from "../middlewares/body_validations/group_member.request.validations.middleware";
import GroupMemberService from "../services/group_member.service";

const router = Router({mergeParams: true});

router.get('/', [], async (req:Request, res: Response)=>{
    const showDeleted  = req.query.showDeleted === 'true';
    const returnedResponse = await GroupMemberService.getAllMembers(req.params.groupId, showDeleted);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});


router.get('/:memberUserId', [], async (req:Request, res: Response)=>{
    const returnedResponse = await GroupMemberService.getSingleGroupMember(req.params.groupId, req.params.memberUserId);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

router.post('/', [isGroupAdmin, validateNewGroupMember], async (req:Request, res: Response)=>{
    const returnedResponse = await GroupMemberService.newGroupMember(req.params.groupId, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

router.put('/:memberUserId/delete', [isGroupAdmin, validateDeleteGroupMember], async (req:Request, res: Response)=>{
    const returnedResponse = await GroupMemberService.setDeleted(req.params.groupId, req.params.memberUserId, req.body);
    return res.status(returnedResponse.status).json(returnedResponse.response);
});

export default router;
