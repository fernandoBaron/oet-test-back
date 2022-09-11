import {AbstractException} from "./abstract-exception";

export class EmailCodeAlreadySent extends AbstractException{

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 404;
        this.err = 'Mail already sent';
        this.message = 'El correo ya fue enviado hace menos de dos minutos, por favor verifique su bandeja de correo no deseado o intente de nuevo una vez transcurridos dos minutos...';
        this.ok = false;
    }
}