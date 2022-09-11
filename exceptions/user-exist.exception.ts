import {AbstractException} from "./abstract-exception";

export class UserExistException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'user already exist';
        this.message = 'El usuario ya existe';
        this.ok = false;
    }

}
