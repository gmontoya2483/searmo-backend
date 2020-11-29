import logger from '../startup/logger.startup';
import {Request, Response, NextFunction } from "express";


const error = async function(err: Error, req: Request, res: Response, next: NextFunction){
    logger.log('error', err.message, {metadata: err });
    res.status(500).send({
        ok: false,
        message: "Internal Error"
    });
};

export default error;
