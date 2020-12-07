import {NextFunction, Request, Response } from "express";
import { schemas } from '../../schemas/group_member.schema';

export const validateNewGroupMember = function  (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.new.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}

export const  validateDeleteGroupMember = function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.delete.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}

