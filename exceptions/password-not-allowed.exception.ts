import {AbstractException} from "./abstract-exception";

export class PasswordNotAllowedException extends AbstractException{

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'password must be longer 6 chars';
        this.message = 'La contraseña debe ser mayor a 6 carácteres';
        this.ok = false;
    }
}