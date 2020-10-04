import { GameAction, GameHistoryMessage, ScoreBoardIndex } from '../enums';
import { UserInputError } from '../error';
import { Game } from '../game';
import { calculateBonuses } from '../helpers';
import { GameBoardType } from '../pb';
import { ActionBase } from './base';
import { ActionSelectChainToDisposeOfNext } from './selectChainToDisposeOfNext';

export class ActionSelectMergerSurvivor extends ActionBase {
  chainsBySize: GameBoardType[][];

  constructor(game: Game, playerID: number, public chains: GameBoardType[], public tile: number) {
    super(game, playerID, GameAction.SelectMergerSurvivor);

    const sizeToChains = new Map<number, GameBoardType[]>();
    const sizes: number[] = [];
    for (let i = 0; i < chains.length; i++) {
      const chain = chains[i];
      const size = this.game.gameBoardTypeCounts[chain];

      let chainsOfThisSize = sizeToChains.get(size);
      if (chainsOfThisSize === undefined) {
        chainsOfThisSize = [];
        sizeToChains.set(size, chainsOfThisSize);
        sizes.push(size);
      }

      chainsOfThisSize.push(chain);
    }

    sizes.sort((a, b) => b - a);

    const chainsBySize: GameBoardType[][] = new Array(sizes.length);
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i];
      chainsBySize[i] = sizeToChains.get(size)!;
    }

    this.chainsBySize = chainsBySize;
  }

  prepare() {
    this.game.getCurrentMoveData().addGameHistoryMessage(GameHistoryMessage.MergedChains, this.playerID, [this.chains]);

    if (this.chainsBySize[0].length === 1) {
      return this.completeAction(this.chainsBySize[0][0]);
    } else {
      this.game.setGameBoardPosition(this.tile, GameBoardType.NOTHING_YET);
      this.game.determineTileRackTypesForEverybody();
      return null;
    }
  }

  execute(parameters: any[]) {
    if (parameters.length !== 1) {
      throw new UserInputError('did not get exactly 1 parameter');
    }
    const controllingChain: GameBoardType = parameters[0];
    if (!Number.isInteger(controllingChain) || controllingChain < GameBoardType.LUXOR || controllingChain > GameBoardType.IMPERIAL) {
      throw new UserInputError('parameter is not a valid chain');
    }
    if (this.chainsBySize[0].indexOf(controllingChain) === -1) {
      throw new UserInputError('cannot select chain as the controlling chain');
    }

    this.game.getCurrentMoveData().addGameHistoryMessage(GameHistoryMessage.SelectedMergerSurvivor, this.playerID, [controllingChain]);

    return this.completeAction(controllingChain);
  }

  protected completeAction(controllingChain: GameBoardType) {
    const moveData = this.game.getCurrentMoveData();

    this.game.fillCells(this.tile, controllingChain);
    this.game.setChainSize(controllingChain, this.game.gameBoardTypeCounts[controllingChain]);
    this.game.determineTileRackTypesForEverybody();

    // pay bonuses
    const bonuses: number[] = new Array(this.game.userIDs.size);
    for (let playerID = 0; playerID < bonuses.length; playerID++) {
      bonuses[playerID] = 0;
    }

    for (let i = 0; i < this.chains.length; i++) {
      const chain = this.chains[i];
      if (chain !== controllingChain) {
        const chainBonuses = calculateBonuses(this.game.getScoreBoardColumnArray(chain), this.game.scoreBoardPrice.get(chain)!);
        for (let j = 0; j < chainBonuses.length; j++) {
          const chainBonus = chainBonuses[j];
          bonuses[chainBonus.playerID] += chainBonus.amount;
          moveData.addGameHistoryMessage(GameHistoryMessage.ReceivedBonus, chainBonus.playerID, [chain, chainBonus.amount]);
        }
      }
    }
    this.game.adjustScoreBoardColumn(ScoreBoardIndex.Cash, bonuses);

    const actions: ActionBase[] = [];
    for (let i = 0; i < this.chainsBySize.length; i++) {
      let chains = this.chainsBySize[i];
      if (i === 0) {
        chains = chains.filter((c) => c !== controllingChain);
      }

      if (chains.length > 0) {
        actions.push(new ActionSelectChainToDisposeOfNext(this.game, this.playerID, chains, controllingChain));
      }
    }

    return actions;
  }
}
