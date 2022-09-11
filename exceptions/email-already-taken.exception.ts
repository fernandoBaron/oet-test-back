import {AbstractException} from "./abstract-exception";

export class EmailAlreadyTakenException extends AbstractException {
    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'Email is already taken';
        this.message = 'Email ya ha sido usado';
        this.ok = false;
    }

}