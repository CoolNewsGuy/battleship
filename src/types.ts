import { type Player } from "./scripts/Player";
import { type Ship } from "./scripts/Ship";

export const enum Spot {
    Empty,
    Taken,
    Missed,
    Damaged,
}
export type ArrayOfLen10<T> = [T, T, T, T, T, T, T, T, T, T];
export type MatrixOf10x10<T> = ArrayOfLen10<ArrayOfLen10<T>>;
export type NumFrom0To9 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface SpotWithShip {
    spotStatus: Spot.Taken | Spot.Damaged;
    ship: Ship;
}
export interface PlacingOptions {
    ship: Ship;
    row: number;
    col: number;
    dir: "horizontal" | "vertical";
}
export interface AttackOptions {
    receiver: Player;
    row: number;
    col: number;
}
