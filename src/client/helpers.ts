import { PB_GameBoardType, PB_GameMode } from '../common/pb';
import styles from './App.module.css';

export const allChains = [
  PB_GameBoardType.LUXOR,
  PB_GameBoardType.TOWER,
  PB_GameBoardType.AMERICAN,
  PB_GameBoardType.FESTIVAL,
  PB_GameBoardType.WORLDWIDE,
  PB_GameBoardType.CONTINENTAL,
  PB_GameBoardType.IMPERIAL,
];

export const gameBoardTypeToCSSClassName = new Map([
  [PB_GameBoardType.LUXOR, styles.colorLuxor],
  [PB_GameBoardType.TOWER, styles.colorTower],
  [PB_GameBoardType.AMERICAN, styles.colorAmerican],
  [PB_GameBoardType.FESTIVAL, styles.colorFestival],
  [PB_GameBoardType.WORLDWIDE, styles.colorWorldwide],
  [PB_GameBoardType.CONTINENTAL, styles.colorContinental],
  [PB_GameBoardType.IMPERIAL, styles.colorImperial],
  [PB_GameBoardType.NOTHING, styles.colorNothing],
  [PB_GameBoardType.NOTHING_YET, styles.colorNothingYet],
  [PB_GameBoardType.CANT_PLAY_EVER, styles.colorCantPlayEver],
  [PB_GameBoardType.I_HAVE_THIS, styles.colorIHaveThis],
  [PB_GameBoardType.WILL_PUT_LONELY_TILE_DOWN, styles.colorWillPutLonelyTileDown],
  [PB_GameBoardType.HAVE_NEIGHBORING_TILE_TOO, styles.colorHaveNeighboringTileToo],
  [PB_GameBoardType.WILL_FORM_NEW_CHAIN, styles.colorWillFormNewChain],
  [PB_GameBoardType.WILL_MERGE_CHAINS, styles.colorWillMergeChains],
  [PB_GameBoardType.CANT_PLAY_NOW, styles.colorCantPlayNow],
]);

export const gameBoardTypeToHotelInitial = new Map([
  [PB_GameBoardType.LUXOR, 'L'],
  [PB_GameBoardType.TOWER, 'T'],
  [PB_GameBoardType.AMERICAN, 'A'],
  [PB_GameBoardType.FESTIVAL, 'F'],
  [PB_GameBoardType.WORLDWIDE, 'W'],
  [PB_GameBoardType.CONTINENTAL, 'C'],
  [PB_GameBoardType.IMPERIAL, 'I'],
]);

export const teamNumberToCSSClassName = new Map([
  [1, styles.colorTeam1],
  [2, styles.colorTeam2],
  [3, styles.colorTeam3],
]);

export const enum GameBoardLabelMode {
  Nothing,
  Coordinates,
  HotelInitials,
}

export const allGameModes = [
  PB_GameMode.SINGLES_1,
  PB_GameMode.SINGLES_2,
  PB_GameMode.SINGLES_3,
  PB_GameMode.SINGLES_4,
  PB_GameMode.SINGLES_5,
  PB_GameMode.SINGLES_6,
  PB_GameMode.TEAMS_2_VS_2,
  PB_GameMode.TEAMS_2_VS_2_VS_2,
  PB_GameMode.TEAMS_3_VS_3,
];

export const gameModeToString = new Map([
  [PB_GameMode.SINGLES_1, 'Singles 1'],
  [PB_GameMode.SINGLES_2, 'Singles 2'],
  [PB_GameMode.SINGLES_3, 'Singles 3'],
  [PB_GameMode.SINGLES_4, 'Singles 4'],
  [PB_GameMode.SINGLES_5, 'Singles 5'],
  [PB_GameMode.SINGLES_6, 'Singles 6'],
  [PB_GameMode.TEAMS_2_VS_2, 'Teams 2 vs 2'],
  [PB_GameMode.TEAMS_2_VS_2_VS_2, 'Teams 2 vs 2 vs 2'],
  [PB_GameMode.TEAMS_3_VS_3, 'Teams 3 vs 3'],
]);
