import './global.css';

import { List } from 'immutable';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { GameBoardType } from '../enums';
import { GameBoard, GameBoardProps } from './components/GameBoard';
import { ScoreBoard, ScoreBoardProps } from './components/ScoreBoard';
import { TileRack, TileRackProps } from './components/TileRack';
import { GameBoardLabelMode } from './enums';
import { getTileString } from './helpers';

function main() {
    ReactDOM.render([getGameBoard(), getScoreBoard(), getTileRack()], document.getElementById('root'));
}

function onTileClicked(tile: number) {
    console.log('onTileClicked:', getTileString(tile));
}

function getGameBoard() {
    const props1: GameBoardProps = {
        gameBoard: List([
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
        ]),
        tileRack: List([8, 86, null, 40, 99, 12]),
        labelMode: GameBoardLabelMode.Coordinates,
        cellSize: 40,
        onCellClicked: onTileClicked,
    };

    const props2: GameBoardProps = { ...props1, labelMode: GameBoardLabelMode.HotelInitials };

    const props3: GameBoardProps = { ...props1, labelMode: GameBoardLabelMode.Nothing };

    return (
        <div>
            <h1>GameBoard</h1>
            <h2>labelMode=Coordinates</h2>
            <GameBoard {...props1} />
            <h2>labelMode=HotelInitials</h2>
            <GameBoard {...props2} />
            <h2>labelMode=Nothing</h2>
            <GameBoard {...props3} />
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
    const props1: TileRackProps = {
        tiles: List([1, 28, 55, 82, 92, 40]),
        types: List([
            GameBoardType.Luxor,
            GameBoardType.Tower,
            GameBoardType.American,
            GameBoardType.Festival,
            GameBoardType.Worldwide,
            GameBoardType.Continental,
        ]),
        buttonSize: 40,
        onTileClicked: onTileClicked,
    };

    const props2: TileRackProps = {
        tiles: List([71, null, 99, 12, 8, 17]),
        types: List([
            GameBoardType.Imperial,
            null,
            GameBoardType.WillMergeChains,
            GameBoardType.WillPutLonelyTileDown,
            GameBoardType.HaveNeighboringTileToo,
            GameBoardType.HaveNeighboringTileToo,
        ]),
        buttonSize: 40,
        onTileClicked: onTileClicked,
    };

    const props3: TileRackProps = {
        tiles: List([null, 86, null, 38, null, 74]),
        types: List([null, GameBoardType.CantPlayEver, null, GameBoardType.WillFormNewChain, null, GameBoardType.CantPlayNow]),
        buttonSize: 40,
        onTileClicked: onTileClicked,
    };

    return (
        <div>
            <h1>TileRack</h1>
            <TileRack {...props1} />
            <br />
            <TileRack {...props2} />
            <br />
            <TileRack {...props3} />
        </div>
    );
}

main();
