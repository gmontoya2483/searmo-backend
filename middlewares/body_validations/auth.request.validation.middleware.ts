import {NextFunction, Request, Response } from "express";
import { schemas } from '../../schemas/users.schema';

export const validateAuth = function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.auth.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}
