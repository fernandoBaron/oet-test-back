interface ExceptionInterface {
    code: number,
    ok: boolean,
    err: string,
    message: string,
}

export abstract class AbstractException {

    protected code: number | undefined;
    protected ok: boolean | undefined;
    protected err: string | undefined;
    protected message: string | undefined;

    protected abstract setValues(): void;

    getError () {
        return {
            code: this.code,
            ok: this.ok,
            err: this.err,
            message: this.message,
        }
    }

}
