export class WrongCoordsError extends Error {
    readonly name: string;
    readonly message: string;

    constructor(row: number, col: number) {
        super();
        this.name = "WrongCoordsError";
        this.message = `\
Wrong coordinates were specified:
row: ${row}
col: ${col}

Both values must be > 0 and < 9.
`;
    }
}
