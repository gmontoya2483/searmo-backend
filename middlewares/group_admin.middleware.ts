import {NextFunction, Request, Response} from "express";


export const isGroupAdmin  =  function (req: Request , res: Response, next: NextFunction){
    // @ts-ignore
    if(!req.groupMember){
         return res.status(403).send({
             ok: false,
             message: "Acceso denegado. No se verificó que el usuario sea miembro del grupo."});
    }

    // @ts-ignore
    if(!req.groupMember.isAdmin){
        return res.status(403).send({
            ok: false,
            message: "Acceso denegado. El usuario no es administrador del grupo."});
    }

    next();
}
