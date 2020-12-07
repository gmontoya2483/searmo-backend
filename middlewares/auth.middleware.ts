import { JWT_PRIVATE_KEY } from "../globals/environment.global";
import SecurityService from "../services/security.service"
import { NextFunction, Request, Response } from "express";
import {User} from "../models/user.model";
import logger from "../startup/logger.startup";

export const  isAuthenticated = async function  (req: Request , res: Response, next: NextFunction){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send({ok: false, message: "Acceso denegado. No se recibió el token."});

    try {
        const decoded: any = await SecurityService.validateJWT(token, JWT_PRIVATE_KEY);

        const user = await User.findById(decoded._id).select({password: 0});
        if (!user){
            logger.warn(`JWT Validation: No se encontro el Usuario con id ${decoded._id}`);
            res.status(400).send({ok: false, message: "Usuario no valido."});
        }

        // @ts-ignore
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ok: false, message: "token inválido."});
    }
};
