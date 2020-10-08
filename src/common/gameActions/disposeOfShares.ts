import { GameActionEnum, GameHistoryMessageEnum, ScoreBoardIndexEnum } from '../enums';
import { UserInputError } from '../error';
import { Game } from '../game';
import { GameBoardType, PB } from '../pb';
import { ActionBase } from './base';

export class ActionDisposeOfShares extends ActionBase {
  sharesOwnedInDefunctChain: number;
  sharesAvailableInControllingChain = 0;

  constructor(game: Game, playerID: number, public defunctChain: GameBoardType, public controllingChain: GameBoardType) {
    super(game, playerID, GameActionEnum.DisposeOfShares);

    this.sharesOwnedInDefunctChain = this.game.scoreBoard.get(playerID)!.get(defunctChain)!;
  }

  prepare() {
    this.sharesAvailableInControllingChain = this.game.scoreBoardAvailable.get(this.controllingChain)!;

    return null;
  }

  execute(gameAction: PB.IGameAction) {
    if (!gameAction.disposeOfShares) {
      throw new UserInputError('disposeOfShares game action not provided');
    }
    const tradeAmount = gameAction.disposeOfShares.tradeAmount;
    const sellAmount = gameAction.disposeOfShares.sellAmount;
    if (tradeAmount === null || tradeAmount === undefined || tradeAmount < 0) {
      throw new UserInputError('trade amount is not an integer >= 0');
    }
    if (sellAmount === null || sellAmount === undefined || sellAmount < 0) {
      throw new UserInputError('sell amount is not an integer >= 0');
    }
    if (tradeAmount % 2 !== 0) {
      throw new UserInputError('trade amount is not a multiple of 2');
    }
    if (tradeAmount / 2 > this.sharesAvailableInControllingChain) {
      throw new UserInputError('cannot trade for more shares than are available');
    }
    if (tradeAmount + sellAmount > this.sharesOwnedInDefunctChain) {
      throw new UserInputError('cannot trade and sell more shares than owned');
    }

    if (tradeAmount > 0 || sellAmount > 0) {
      const adjustments: [GameBoardType | ScoreBoardIndexEnum, number][] = [[this.defunctChain, -tradeAmount - sellAmount]];
      if (tradeAmount > 0) {
        adjustments.push([this.controllingChain, tradeAmount / 2]);
      }
      if (sellAmount > 0) {
        adjustments.push([ScoreBoardIndexEnum.Cash, sellAmount * this.game.scoreBoardPrice.get(this.defunctChain)!]);
      }
      this.game.adjustPlayerScoreBoardRow(this.playerID, adjustments);
    }

    this.game.getCurrentGameState().addGameHistoryMessage(GameHistoryMessageEnum.DisposedOfShares, this.playerID, [this.defunctChain, tradeAmount, sellAmount]);

    return [];
  }
}
