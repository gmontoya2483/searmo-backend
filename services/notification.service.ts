import {ISendGridMessage} from '../Interfaces/sendgrig.interfaces'
import {NOT_BASE_URL} from "../globals/environment.global";


export abstract class Notification {

    public static getValidationEmail( name: string, email: string, token: string ): ISendGridMessage{

        const to = email;
        const subject = `Se armo el Fulbito - Confirmar tu correo electrónico`;

        const html= `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="utf-8"><title>Activar cuenta</title>
            </head>
            <body>
                <h2>Confirma tu correo electronico</h2>
                <br>
                <p>Hola ${name},</p>
                 <p>Gracias por registrarte en Se armo el fulbito.
                 Para poder acceder a tu cuenta primero debes validar tu dirección de correo electrónico.</p>
                 <br>
                 <br>
                 <h3>Haz click en el siguiente enlace:</h3>
                 <br>
                 <a href=${NOT_BASE_URL}/api/register/validate?token=${token}><h2>Activar cuenta</h2></a>
                 <br>
                 <p>Muchas gracias!!</p>
            </body>
            </html>`;

        return this.generateNotification(to, subject, html);
    }



    private static generateNotification (  to: string, subject: string, html: string): ISendGridMessage{
        // @ts-ignore
        return { to, subject, html: html.replace(/['"]+/g, "") };
    }

}
