import {AbstractException} from "./abstract-exception";

export class VehicleNotFoundException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'Vehicle not found';
        this.message = 'Vehiculo no encontrado';
        this.ok = false;
    }

}
