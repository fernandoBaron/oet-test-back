import {AbstractException} from "./abstract-exception";

export class VehicleExistException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'Vehicle already exist';
        this.message = 'El vehiculo ya existe';
        this.ok = false;
    }

}
