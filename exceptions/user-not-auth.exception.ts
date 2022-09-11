import {AbstractException} from "./abstract-exception";

export class UserNotAuthException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 403;
        this.err = 'User unauthorized';
        this.message = 'Usuario no autorizado';
        this.ok = false;
    }

}
