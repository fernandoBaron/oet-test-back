import {AbstractException} from "./abstract-exception";

export class ImageNotFoundException extends AbstractException {

    constructor() {
        super();
        this.setValues();
    }

    protected setValues(): void {
        this.code = 400;
        this.err = 'Image not found';
        this.message = 'Imagen no encontrada';
        this.ok = false;
    }

}
