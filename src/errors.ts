export class WrongCoordsError extends Error {
    readonly name: string;
    readonly message: string;

    constructor() {
        super();
        this.name = "WrongCoordsError";
        this.message = "Wrong coordinates were specified";
    }
}
