import logger from "../startup/logger.startup";
import {SEND_GRID_API_KEY, SEND_GRID_FROM_EMAIL} from "../globals/environment.global";
import {ISendGridMessage} from "../Interfaces/sendgrig.interfaces";

export class SendGrid {
    sgMail = require('@sendgrid/mail');
    public emailFrom: string;

    constructor() {

        this.sgMail.setApiKey(SEND_GRID_API_KEY);
        this.emailFrom = SEND_GRID_FROM_EMAIL;

    }


    public async sendSingleEmail (message: ISendGridMessage){
        const msg = {...message, from: this.emailFrom};

        try {
            await this.sgMail.send(msg);
        }catch (error) {
            logger.error('No se pudo mandar el email', error);
        }
    }




}
