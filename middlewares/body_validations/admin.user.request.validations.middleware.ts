import {NextFunction, Request, Response, } from "express";
import { schemas } from '../../schemas/admin.users.schema';

export const  validateUserActive = function  (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.active.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}

export const validateUserAdministrator = function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.administrator.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}

export  const validateUserDelete = function  (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.delete.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}

export const validateUserUpdate =  function  (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.update.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}

export const validateUserValidate = function  (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schemas.validate.validate(req.body);
    error ? res.status(422).json({
            ok: false,
            message: error.details[0].message.replace(/['"]+/g, "")
        })
        : next();
}
