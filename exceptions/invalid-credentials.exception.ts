import {AbstractException} from "./abstract-exception";

export class InvalidCredentialsException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 404;
        this.err = 'Invalid Credentials';
        this.message = 'Credenciales inválidas';
        this.ok = false;
    }

}
