import {AbstractException} from "./abstract-exception";

export class FieldNotSentException extends AbstractException {
    private field: string;
    constructor(field: string) {
        super();
        this.field = field;
        this.setValues()
    }
    protected setValues(): void {
        this.code = 400;
        this.err = `${ this.field } not sent`;
        this.message = `${ this.field } no enviado`;
        this.ok = false;
    }

}