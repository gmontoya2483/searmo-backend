import {NextFunction, Request, Response} from "express";

module.exports =  function active  (req: Request , res: Response, next: NextFunction){
    // @ts-ignore
    if(!req.user){
        return res.status(401).send({ok: false, message: "Acceso denegado. No se verificó el token."});
    }

    // @ts-ignore
    if(!req.user.isActive){
        return res.status(401).send({ok: false, message: "Acceso denegado. El ususario no esta activo."});
    }

    // @ts-ignore
    if(req.user.isDeleted.value){
        return res.status(401).send({ok: false, message: "Acceso denegado. El usuario ha sido eliminado."});
    }

    next();
}
