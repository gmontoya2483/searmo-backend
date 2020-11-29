import { JWT_PRIVATE_KEY } from "../globals/environment.global";
import Security from "../classes/security.class"
import { NextFunction, Request, Response } from "express";

module.exports = async function auth  (req: Request , res: Response, next: NextFunction){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send({ok: false, message: "Acceso denegado. No se recibió el token."});

    try {
        const decoded = await Security.validateJWT(token, JWT_PRIVATE_KEY);
        req.body.user = decoded;
        next();
    } catch (e) {
        res.status(400).send({ok: false, message: "token inválido."});
    }
};
