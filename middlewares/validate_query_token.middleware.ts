import { JWT_PRIVATE_KEY } from "../globals/environment.global";
import SecurityService from "../services/security.service"
import { NextFunction, Request, Response } from "express";

export const  validateQueryToken = async function  (req: Request , res: Response, next: NextFunction){

    const token: any  = req.query.token || null;
    if(!token) return res.status(401).send({ok: false, message: "Acceso denegado. No se recibió el token."});

    try {
        const decoded: any = await SecurityService.validateJWT(token,JWT_PRIVATE_KEY);
        // @ts-ignore
        req.userId = decoded._id;
        next();
    } catch (e) {
        return res.status(401).send({ok: false, message: "token inválido."});
    }
};
