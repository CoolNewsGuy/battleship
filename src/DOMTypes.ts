export type RowLetter =
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J";

export const enum HTMLClass {
    Gameboard = "gameboard",

    LostShipsContainer = "lost-ships-container",
    LostShipsLengths = "lost-ships-lengths",

    ShipsContainer = "ships-container",
    Ship = "ship",
    VerticalShip = "vertical-ship",
    NormalShip = "normal-ship",
    SelectedShip = "selected-ship",
    DamagedShip = "damaged-ship",
    Square = "square",

    Grid = "grid",
    ColumnsNumbers = "columns-numbers",
    Row = "row",
    EmptySquare = "empty-square",
    ColumnNumber = "column-number",
    RowLetter = "row-letter",
    PlayingSquare = "playing-square",

    PlayerNameContainer = "player-name-container",
    PlayerName = "player-name",
}
