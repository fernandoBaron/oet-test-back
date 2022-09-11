import {AbstractException} from "./abstract-exception";

export class GeneralExceptionNotFoundException extends AbstractException {

    e: any;

    constructor(e: any) {
        super();
        this.e = e
        this.setValues();
    }

    protected setValues(): void {
        this.code = 401;
        this.err = 'General Error';
        this.message = 'Error indeterminado';
        this.ok = false;
    }

    getError() {
        let object: any = {...super.getError()};
        object.details = this.e;
        return object;
    }

}
