import {AbstractException} from "./abstract-exception";

export class UserNotFoundException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 404;
        this.err = 'User not found';
        this.message = 'Usuario no encontrado';
        this.ok = false;
    }

}
