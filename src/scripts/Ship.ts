export class Ship {
    readonly shipLength: number;
    #receivedHits: number;

    constructor(shipLength: number) {
        this.shipLength = shipLength;
        this.#receivedHits = 0;
    }

    get receivedHits(): number {
        return this.#receivedHits;
    }

    getHit(): void {
        this.#receivedHits += 1;
    }
}
