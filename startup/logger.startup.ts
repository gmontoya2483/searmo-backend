require('express-async-errors');
import winston from "winston";
import { LOG_FILE, LOG_FILE_EXCEPTIONS, LOG_GENERAL_LEVEL,LOG_FILE_LEVEL, LOG_FILE_EXCEPTIONS_LEVEL } from "../globals/environment.global";


const logger = winston.createLogger({
    format: winston.format.combine(
        //winston.format.label({ label: 'right meow!' }),
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.colorize()
    ),
    level: LOG_GENERAL_LEVEL,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: LOG_FILE, level: LOG_FILE_LEVEL })
    ],
    exceptionHandlers: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: LOG_FILE_EXCEPTIONS, level: LOG_FILE_EXCEPTIONS_LEVEL })
    ]
});
export default logger;

