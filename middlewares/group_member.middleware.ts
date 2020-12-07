import {NextFunction, Request, Response} from "express";
import {GroupMember} from "../models/group_members.model";

export const isGroupMember  =  async function (req: Request , res: Response, next: NextFunction){
    // @ts-ignore
    if(!req.user){
        return res.status(401).send({ok: false, message: "Acceso denegado. No se verificó el token."});
    }

    // @ts-ignore
    const {_id: currentUserId } = req.user;
    const { groupId } = req.params

    const groupMember = await GroupMember.findOne({user: currentUserId, group: groupId});

    if (!groupMember) {
        return res.status(403).send({ok: false, message: "El usuario no pertenece al grupo."});
    }

    // @ts-ignore
    if (groupMember.isDeleted.value === true || groupMember.isActive === false){
        return res.status(403).send({ok: false, message: "El usuario no pertenece al grupo."});
    }

    // @ts-ignore
    req.groupMember= groupMember;
    next();
}
