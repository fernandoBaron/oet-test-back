import {AbstractException} from "./abstract-exception";

export class PasswordInvalidException extends AbstractException{
    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'Invalid password';
        this.message = 'Password inválido';
        this.ok = false;
    }
}