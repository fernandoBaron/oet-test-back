import {AbstractException} from "./abstract-exception";

export class PasswordRecoveryCodeIncorrectException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'Incorrect code';
        this.message = 'Código incorrecto';
        this.ok = false;
    }

}