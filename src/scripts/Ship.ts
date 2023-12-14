export class Ship {
    readonly shipLength: number;
    #receivedHits: number;

    constructor(shipLength: number) {
        this.shipLength = shipLength;
        this.#receivedHits = 0;
    }
}
