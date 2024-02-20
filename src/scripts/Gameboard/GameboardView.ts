import { HTMLClass, type RowLetter } from "../../DOMTypes";
import { type MatrixOf10x10, type Spot, type SpotWithShip } from "../../types";
import { Ship } from "../Ship";

export class GameboardView {
    private readonly gameboardElement: HTMLDivElement;
    private readonly shipsToPlace: Ship[];

    constructor() {
        this.gameboardElement = document.createElement("div");
        this.gameboardElement.className = HTMLClass.Gameboard;
        this.shipsToPlace = [
            new Ship(5),
            new Ship(4),
            new Ship(3),
            new Ship(2),
            new Ship(2),
        ];
    }

    renderTo(
        element: HTMLElement,
        grid: MatrixOf10x10<Spot | SpotWithShip>,
        placedShips: readonly Ship[]
    ): void {
        const lostShipsContainerDiv =
            this.createLostShipsContainer(placedShips);
        const shipsContainerDiv = this.createShipsContainer();
        const gridDiv = this.createGrid();
        const PlayerNameContainerDiv = this.createPlayerNameContainer();

        this.gameboardElement.append(
            lostShipsContainerDiv,
            shipsContainerDiv,
            gridDiv,
            PlayerNameContainerDiv
        );
        element.appendChild(this.gameboardElement);
    }

    private createLostShipsContainer(
        placedShips: readonly Ship[]
    ): HTMLDivElement {
        const lostShipsContainerDiv = document.createElement("div");
        const lostShipsLengthsDiv = document.createElement("div");

        lostShipsContainerDiv.className = HTMLClass.LostShipsContainer;
        lostShipsLengthsDiv.className = HTMLClass.LostShipsLengths;
        lostShipsLengthsDiv.textContent = `(${placedShips
            .filter((ship) => ship.isSunk())
            .join(", ")})`;

        lostShipsContainerDiv.innerHTML = `
        <p>
            Lost Ships' Lengths:
        ${lostShipsLengthsDiv.outerHTML}
        </p>
        `;

        return lostShipsContainerDiv;
    }

    private createShipsContainer(): HTMLDivElement {
        const shipsContainerDiv = document.createElement("div");

        shipsContainerDiv.className = HTMLClass.ShipsContainer;

        const shipDiv = document.createElement("div");

        shipDiv.classList.add(HTMLClass.Ship, HTMLClass.NormalShip);
        shipsContainerDiv.appendChild(shipDiv);

        const ship = this.shipsToPlace.pop();

        if (ship != null) {
            for (let _ = 0; _ < ship.shipLength; _++) {
                const squareDiv = document.createElement("div");

                squareDiv.className = HTMLClass.Square;
                shipDiv.appendChild(squareDiv);
            }
        }

        shipsContainerDiv.onclick = (e) => {
            const clickedElement = e.target;

            if (
                clickedElement instanceof HTMLDivElement &&
                clickedElement.closest(`.${HTMLClass.Ship}`) != null
            ) {
                shipDiv.classList.toggle(HTMLClass.NormalShip);
                shipDiv.classList.toggle(HTMLClass.SelectedShip);
            }
        };

        return shipsContainerDiv;
    }

    private createGrid(): HTMLDivElement {
        const gridDiv = document.createElement("div");

        gridDiv.className = HTMLClass.Grid;

        gridDiv.onpointerover = (e) => {
            const selectedShip = document.querySelector<HTMLDivElement>(
                `.${HTMLClass.SelectedShip}`
            );

            if (selectedShip != null) {
                const hoveredElement = e.target;

                if (
                    hoveredElement instanceof HTMLDivElement &&
                    hoveredElement.classList.contains(HTMLClass.PlayingSquare)
                ) {
                    const squaresToPlaceShipOn = [hoveredElement];
                    const shipLength = selectedShip.childElementCount;

                    for (let i = 0; i < shipLength - 1; i++) {
                        let nextSquare;

                        if (
                            selectedShip.classList.contains(
                                HTMLClass.VerticalShip
                            )
                        ) {
                            const currentSquareRow = squaresToPlaceShipOn[
                                i
                            ].closest<HTMLDivElement>(`.${HTMLClass.Row}`);

                            currentSquareRow
                                ?.querySelectorAll<HTMLDivElement>(
                                    `.${HTMLClass.PlayingSquare}`
                                )
                                .forEach((square, i) => {
                                    if (square === hoveredElement) {
                                        nextSquare = (
                                            currentSquareRow?.nextSibling as HTMLDivElement
                                        ).querySelectorAll<HTMLDivElement>(
                                            `.${HTMLClass.PlayingSquare}`
                                        )[i];
                                    }
                                });
                        } else {
                            nextSquare = squaresToPlaceShipOn[i].nextSibling;
                        }

                        if (nextSquare != null) {
                            squaresToPlaceShipOn.push(
                                nextSquare as HTMLDivElement
                            );
                        }
                    }

                    for (const square of squaresToPlaceShipOn) {
                        square.style.backgroundColor =
                            squaresToPlaceShipOn.length === shipLength
                                ? "var(--gameboard-grid-squares-to-place-ship-on-background)"
                                : "var(--gameboard-grid-squares-not-to-place-ship-on-background)";
                    }

                    hoveredElement.onpointerleave = () => {
                        for (const square of squaresToPlaceShipOn) {
                            square.style.backgroundColor = "";
                        }
                    };

                    hoveredElement.onclick = () => {
                        if (squaresToPlaceShipOn.length === shipLength) {
                            gridDiv.appendChild(selectedShip);

                            selectedShip.style.position = "absolute";
                            selectedShip.style.left = `${hoveredElement.offsetLeft}px`;
                            selectedShip.style.top = `${hoveredElement.offsetTop}px`;
                        }
                    };
                }
            }
        };

        gridDiv.onauxclick = (e) => {
            const clickedElement = e.target;

            if (
                e.button === 1 &&
                clickedElement instanceof HTMLDivElement &&
                clickedElement.closest(`.${HTMLClass.Ship}`) != null
            ) {
                const ship = clickedElement.closest<HTMLDivElement>(
                    `.${HTMLClass.Ship}`
                );

                if (ship != null) {
                    ship.style.visibility = "hidden";
                    const startingSquare = document.elementFromPoint(
                        ship.getBoundingClientRect().x,
                        ship.getBoundingClientRect().y
                    );
                    ship.style.visibility = "visible";

                    const playingSquares =
                        document.querySelectorAll<HTMLDivElement>(
                            `.${HTMLClass.PlayingSquare}`
                        );
                    const newSquares = [startingSquare];
                    const shipLength = ship.childElementCount;

                    // If ship is in vertical position, change it to horizontal
                    if (ship.classList.contains(HTMLClass.VerticalShip)) {
                        for (let i = 0; i < shipLength - 1; i++) {
                            newSquares.push(
                                newSquares[i]?.nextSibling as HTMLDivElement
                            );
                        }
                    } else {
                        playingSquares.forEach((square, i) => {
                            if (square === startingSquare) {
                                for (let j = 10; j < shipLength * 10; j += 10) {
                                    newSquares.push(playingSquares[i + j]);
                                }
                            }
                        });
                    }

                    if (
                        shipLength ===
                        newSquares.filter((square) => square).length
                    ) {
                        ship.classList.toggle(HTMLClass.VerticalShip);
                    }
                }
            }
        };

        for (let i = 0; i < 11; i++) {
            const rowDiv = document.createElement("div");

            rowDiv.className = HTMLClass.Row;

            // Columns' Numbers row
            if (i === 0) {
                rowDiv.classList.add(HTMLClass.ColumnsNumbers);

                for (let j = 0; j < 11; j++) {
                    const squareDiv = document.createElement("div");

                    squareDiv.className = HTMLClass.Square;

                    if (j === 0) {
                        squareDiv.classList.add(HTMLClass.EmptySquare);
                    } else {
                        squareDiv.classList.add(HTMLClass.ColumnNumber);
                        squareDiv.textContent = `${j}`;
                    }

                    rowDiv.appendChild(squareDiv);
                }
            } else {
                const rowLetters: RowLetter[] = [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "G",
                    "H",
                    "I",
                    "J",
                ];

                for (let j = 0; j < 11; j++) {
                    const squareDiv = document.createElement("div");

                    squareDiv.className = HTMLClass.Square;

                    if (j === 0) {
                        squareDiv.classList.add(HTMLClass.RowLetter);
                        squareDiv.textContent = rowLetters[i - 1];
                    } else {
                        squareDiv.classList.add(HTMLClass.PlayingSquare);
                    }

                    rowDiv.appendChild(squareDiv);
                }
            }

            gridDiv.appendChild(rowDiv);
        }

        return gridDiv;
    }

    private createPlayerNameContainer(): HTMLDivElement {
        const PlayerNameContainerDiv = document.createElement("div");
        const PlayerNameSpan = document.createElement("span");

        PlayerNameContainerDiv.className = HTMLClass.PlayerNameContainer;
        PlayerNameSpan.className = HTMLClass.PlayerName;

        PlayerNameContainerDiv.appendChild(PlayerNameSpan);

        return PlayerNameContainerDiv;
    }
}
