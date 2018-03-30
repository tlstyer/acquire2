import { ActionBase } from './base';
import { GameAction } from '../enums';
import { Game } from '../game';

export class ActionGameOver extends ActionBase {
    constructor(game: Game) {
        super(game, null, GameAction.GameOver);
    }

    prepare() {
        return null;
    }

    execute(parameters: any[]) {
        return null;
    }
}