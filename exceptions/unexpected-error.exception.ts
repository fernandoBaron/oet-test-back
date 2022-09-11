import {AbstractException} from "./abstract-exception";

export class UnexpectedErrorException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'Unexpected error 1002';
        this.message = 'Error inesperado 1002';
        this.ok = false;
    }

}
