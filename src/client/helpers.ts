import { PB_GameMode } from '../common/pb';

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
