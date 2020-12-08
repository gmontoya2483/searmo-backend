export interface ISendGridMessage {
    to: string;
    subject: string;
    text?: string;
    html?:string;
}
