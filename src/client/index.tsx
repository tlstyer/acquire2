import './global.css';

import { List } from 'immutable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { GameBoardType } from '../enums';
import { GameBoard } from './components/GameBoard';
import { ScoreBoard, ScoreBoardProps } from './components/ScoreBoard';
import { TileRack } from './components/TileRack';
import { GameBoardLabelMode } from './enums';
import { getTileString } from './helpers';

function main() {
    ReactDOM.render([getGameBoard(), getScoreBoard(), getTileRack()], document.getElementById('root'));
}

function onTileClicked(tile: number) {
    console.log('onTileClicked:', getTileString(tile));
}

function getGameBoard() {
    const gameBoard = List<GameBoardType>([
        ...[0, 7, 7, 7, 7, 7, 7, 7, 7],
        ...[0, 7, 7, 7, 7, 7, 7, 7, 7],
        ...[7, 8, 7, 7, 7, 7, 8, 7, 7],
        ...[1, 7, 8, 7, 7, 7, 7, 7, 7],
        ...[1, 7, 7, 7, 7, 7, 7, 7, 7],
        ...[7, 7, 7, 7, 5, 7, 7, 8, 7],
        ...[2, 7, 7, 7, 5, 5, 5, 7, 7],
        ...[2, 7, 8, 7, 5, 5, 7, 7, 7],
        ...[7, 7, 7, 7, 5, 9, 6, 6, 6],
        ...[3, 7, 7, 7, 5, 7, 6, 6, 6],
        ...[3, 7, 7, 7, 5, 9, 6, 6, 6],
        ...[7, 4, 4, 7, 5, 5, 9, 6, 6],
    ]);
    const tileRack = List<number | null>([8, 86, null, 40, 99, 12]);
    const cellSize = 40;

    return (
        <div>
            <h1>GameBoard</h1>
            <h2>labelMode=Coordinates</h2>
            <GameBoard gameBoard={gameBoard} tileRack={tileRack} labelMode={GameBoardLabelMode.Coordinates} cellSize={cellSize} onCellClicked={onTileClicked} />
            <h2>labelMode=HotelInitials</h2>
            <GameBoard
                gameBoard={gameBoard}
                tileRack={tileRack}
                labelMode={GameBoardLabelMode.HotelInitials}
                cellSize={cellSize}
                onCellClicked={onTileClicked}
            />
            <h2>labelMode=Nothing</h2>
            <GameBoard gameBoard={gameBoard} tileRack={tileRack} labelMode={GameBoardLabelMode.Nothing} cellSize={cellSize} onCellClicked={onTileClicked} />
        </div>
    );
}

function getScoreBoard() {
    const props1: ScoreBoardProps = {
        usernames: ['winning player', 'losing player'],
        scoreBoard: List<List<number>>([List([6, 1, 13, 10, 4, 4, 6, 207, 785]), List([1, 0, 11, 0, 3, 1, 1, 256, 533])]),
        scoreBoardAvailable: List<number>([18, 24, 1, 15, 18, 20, 18]),
        scoreBoardChainSize: List<number>([3, 0, 39, 5, 2, 4, 13]),
        scoreBoardPrice: List<number>([3, 0, 10, 6, 3, 6, 9]),
        turnPlayerID: 1,
        movePlayerID: 0,
        isTeamGame: false,
        cellWidth: 30,
    };

    const props2: ScoreBoardProps = {
        usernames: ['tlstyer', 'REALLY LONG NAME', 'Somebody Else', 'hi!'],
        scoreBoard: List<List<number>>([
            List([4, 0, 0, 0, 0, 0, 0, 74, 82]),
            List([0, 4, 0, 0, 0, 0, 0, 74, 82]),
            List([0, 0, 0, 0, 0, 4, 0, 88, 104]),
            List([1, 1, 0, 0, 0, 1, 1, 92, 228]),
        ]),
        scoreBoardAvailable: List<number>([20, 20, 25, 25, 25, 20, 24]),
        scoreBoardChainSize: List<number>([2, 2, 0, 0, 0, 2, 9]),
        scoreBoardPrice: List<number>([2, 2, 0, 0, 0, 4, 8]),
        turnPlayerID: 0,
        movePlayerID: 0,
        isTeamGame: false,
        cellWidth: 30,
    };

    const props3: ScoreBoardProps = {
        usernames: ['player 1', 'player 2', 'player 3', 'player 4'],
        scoreBoard: List<List<number>>([
            List([0, 0, 5, 9, 0, 13, 0, 0, 427]),
            List([8, 1, 0, 13, 0, 12, 0, 63, 474]),
            List([7, 1, 11, 0, 0, 0, 0, 107, 212]),
            List([1, 3, 9, 3, 0, 0, 0, 213, 310]),
        ]),
        scoreBoardAvailable: List<number>([9, 20, 0, 0, 25, 0, 25]),
        scoreBoardChainSize: List<number>([0, 0, 4, 27, 0, 42, 0]),
        scoreBoardPrice: List<number>([0, 0, 5, 9, 0, 12, 0]),
        turnPlayerID: -1,
        movePlayerID: -1,
        isTeamGame: true,
        cellWidth: 30,
    };

    return (
        <div>
            <h1>ScoreBoard</h1>
            <ScoreBoard {...props1} />
            <br />
            <ScoreBoard {...props2} />
            <br />
            <ScoreBoard {...props3} />
        </div>
    );
}

function getTileRack() {
    const tiles1 = List<number | null>([1, 28, 55, 82, 92, 40]);
    const types1 = List<GameBoardType | null>([
        GameBoardType.Luxor,
        GameBoardType.Tower,
        GameBoardType.American,
        GameBoardType.Festival,
        GameBoardType.Worldwide,
        GameBoardType.Continental,
    ]);

    const tiles2 = List<number | null>([71, null, 99, 12, 8, 17]);
    const types2 = List<GameBoardType | null>([
        GameBoardType.Imperial,
        null,
        GameBoardType.WillMergeChains,
        GameBoardType.WillPutLonelyTileDown,
        GameBoardType.HaveNeighboringTileToo,
        GameBoardType.HaveNeighboringTileToo,
    ]);

    const tiles3 = List<number | null>([null, 86, null, 38, null, 74]);
    const types3 = List<GameBoardType | null>([null, GameBoardType.CantPlayEver, null, GameBoardType.WillFormNewChain, null, GameBoardType.CantPlayNow]);

    const buttonSize = 40;

    return (
        <div>
            <h1>TileRack</h1>
            <TileRack tiles={tiles1} types={types1} buttonSize={buttonSize} onTileClicked={onTileClicked} />
            <br />
            <TileRack tiles={tiles2} types={types2} buttonSize={buttonSize} onTileClicked={onTileClicked} />
            <br />
            <TileRack tiles={tiles3} types={types3} buttonSize={buttonSize} onTileClicked={onTileClicked} />
        </div>
    );
}

main();
