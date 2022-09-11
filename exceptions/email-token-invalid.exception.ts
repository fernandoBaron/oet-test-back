import {AbstractException} from "./abstract-exception";

export class EmailTokenInvalidException extends AbstractException{

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 404;
        this.err = 'EmailToken invalid';
        this.message = 'EmailToken no es válido';
        this.ok = false;
    }
}