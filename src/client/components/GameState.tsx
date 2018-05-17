import { List } from 'immutable';
import * as React from 'react';
import { GameAction, GameBoardType } from '../../common/enums';
import { ActionBase } from '../../common/gameActions/base';
import { ActionDisposeOfShares } from '../../common/gameActions/disposeOfShares';
import { ActionGameOver } from '../../common/gameActions/gameOver';
import { ActionPlayTile } from '../../common/gameActions/playTile';
import { ActionPurchaseShares } from '../../common/gameActions/purchaseShares';
import { ActionSelectChainToDisposeOfNext } from '../../common/gameActions/selectChainToDisposeOfNext';
import { ActionSelectMergerSurvivor } from '../../common/gameActions/selectMergerSurvivor';
import { ActionSelectNewChain } from '../../common/gameActions/selectNewChain';
import { ActionStartGame } from '../../common/gameActions/startGame';
import { gameBoardTypeToCSSClassName, gameBoardTypeToHotelInitial, getHotelNameSpan, getUsernameSpan } from '../helpers';
import * as style from './GameState.css';

export interface GameStateProps {
    usernames: List<string>;
    nextGameAction: ActionBase;
}

export class GameState extends React.PureComponent<GameStateProps> {
    render() {
        const { usernames, nextGameAction } = this.props;

        return gameStateHandlerLookup[nextGameAction.gameAction](usernames, nextGameAction);
    }
}

// @ts-ignore
const gameStateHandlerLookup: { [key: number]: (usernames: List<string>, action: ActionBase) => JSX.Element } = {
    [GameAction.StartGame]: (usernames: List<string>, action: ActionStartGame) => (
        <div className={style.root}>Waiting for {getUsernameSpan(usernames.get(action.playerID, ''))} to start the game.</div>
    ),
    [GameAction.PlayTile]: (usernames: List<string>, action: ActionPlayTile) => (
        <div className={style.root}>Waiting for {getUsernameSpan(usernames.get(action.playerID, ''))} to play a tile.</div>
    ),
    [GameAction.SelectNewChain]: (usernames: List<string>, action: ActionSelectNewChain) => (
        <div className={style.root}>
            Waiting for {getUsernameSpan(usernames.get(action.playerID, ''))} to select new chain ({getHotelInitialsList(action.availableChains)}).
        </div>
    ),
    [GameAction.SelectMergerSurvivor]: (usernames: List<string>, action: ActionSelectMergerSurvivor) => (
        <div className={style.root}>
            Waiting for {getUsernameSpan(usernames.get(action.playerID, ''))} to select merger survivor ({getHotelInitialsList(action.chainsBySize[0])}).
        </div>
    ),
    [GameAction.SelectChainToDisposeOfNext]: (usernames: List<string>, action: ActionSelectChainToDisposeOfNext) => (
        <div className={style.root}>
            Waiting for {getUsernameSpan(usernames.get(action.playerID, ''))} to select chain to dispose of next ({getHotelInitialsList(action.defunctChains)}).
        </div>
    ),
    [GameAction.DisposeOfShares]: (usernames: List<string>, action: ActionDisposeOfShares) => (
        <div className={style.root}>
            Waiting for {getUsernameSpan(usernames.get(action.playerID, ''))} to dispose of {getHotelNameSpan(action.defunctChain)} shares.
        </div>
    ),
    [GameAction.PurchaseShares]: (usernames: List<string>, action: ActionPurchaseShares) => (
        <div className={style.root}>Waiting for {getUsernameSpan(usernames.get(action.playerID, ''))} to purchase shares.</div>
    ),
    [GameAction.GameOver]: (usernames: List<string>, action: ActionGameOver) => <div className={style.root}>Game over.</div>,
};

function getHotelInitialsList(chains: GameBoardType[]) {
    const entries: (JSX.Element | string)[] = new Array(chains.length * 2 - 1);

    for (let i = 0; i < chains.length; i++) {
        const chain = chains[i];
        entries[i * 2] = (
            <span key={chain} className={gameBoardTypeToCSSClassName[chain]}>
                {gameBoardTypeToHotelInitial[chain]}
            </span>
        );
    }

    if (chains.length === 2) {
        entries[1] = ' or ';
    } else {
        for (let i = 1; i < chains.length - 1; i++) {
            entries[i * 2 - 1] = ', ';
        }
        entries[(chains.length - 1) * 2 - 1] = ', or ';
    }

    return entries;
}
