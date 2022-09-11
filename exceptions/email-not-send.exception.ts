import {AbstractException} from "./abstract-exception";

export class EmailNotSendException extends AbstractException{

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 404;
        this.err = 'Mail does not send';
        this.message = 'No fue enviado el correo';
        this.ok = false;
    }
}