import {NextFunction, Request, Response} from "express";

module.exports =  function validated  (req: Request , res: Response, next: NextFunction){
    // @ts-ignore
    if(!req.user){
        return res.status(401).send({ok: false, message: "Acceso denegado. No se verificó el token."});
    }

    // @ts-ignore
    if(!req.user.isValidated.value){
        return res.status(401).send({ok: false, message: "Acceso denegado. Usuario no validado."});
    }
    next();
}
