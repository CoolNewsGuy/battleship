import { type Ship } from "./scripts/Ship";

export const enum Spot {
    Empty,
    Taken,
    Missed,
}
export type ArrayOfLen10<T> = [T, T, T, T, T, T, T, T, T, T];
export type MatrixOf10x10<T> = ArrayOfLen10<ArrayOfLen10<T>>;

export interface PlacingOptions {
    ship: Ship;
    row: number;
    col: number;
}
