import {AbstractException} from "./abstract-exception";

export class EmailVerifiedCantBeModifyException extends AbstractException {
    constructor() {
        super();
        this.setValues()
    }
    protected setValues(): void {
        this.code = 400;
        this.err = 'Email verified can not be modified';
        this.message = 'El email ya ha sido verificado y no se puede cambiar';
        this.ok = false;
    }

}