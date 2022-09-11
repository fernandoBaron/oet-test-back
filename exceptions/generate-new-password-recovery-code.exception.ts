import {AbstractException} from "./abstract-exception";

export class GenerateNewPasswordRecoveryCodeException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'Generate new code';
        this.message = 'Por favor genere un código nuevo, el código actual está vencido o no existe';
        this.ok = false;
    }

}