import {AbstractException} from "./abstract-exception";

export class UserIsBlockedException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 403;
        this.err = 'User is blocked';
        this.message = 'Usuario está bloqueado';
        this.ok = false;
    }

}
