import { List } from 'immutable';
import * as React from 'react';

import { GameMode, PlayerArrangementMode } from '../../common/enums';
import { gameModeToNumPlayers, gameModeToTeamSize } from '../../common/helpers';
import { teamNumberToCSSClassName } from '../helpers';
import * as style from './GameSetupUI.css';

export interface GameSetupUIProps {
    gameMode: GameMode;
    playerArrangementMode: PlayerArrangementMode;
    usernames: List<string | null>;
    hostUsername: string;
    onChangeGameMode?: (gameMode: GameMode) => void;
    onChangePlayerArrangementMode?: (playerArrangementMode: PlayerArrangementMode) => void;
    onSwapPositions?: (position1: number, position2: number) => void;
    onKickUser?: (position: number) => void;
}

interface GameSetupUIState {}

export class GameSetupUI extends React.PureComponent<GameSetupUIProps, GameSetupUIState> {
    render() {
        const { gameMode, playerArrangementMode, usernames, onChangeGameMode, onChangePlayerArrangementMode } = this.props;

        let numUsersInGame = 0;
        for (let i = 0; i < usernames.size; i++) {
            const username = usernames.get(i, null);
            if (username !== null) {
                numUsersInGame++;
            }
        }

        const isTeamGame = gameModeToTeamSize[gameMode] > 1;

        return (
            <div>
                Game mode:{' '}
                {onChangeGameMode !== undefined ? (
                    <select
                        defaultValue={gameMode.toString()}
                        onChange={(event: React.FormEvent<HTMLSelectElement>) => onChangeGameMode(parseInt(event.currentTarget.value, 10))}
                    >
                        {allGameModes.map(gm => (
                            <option key={gm} value={gm} disabled={gameModeToNumPlayers[gm] < numUsersInGame}>
                                {gameModeToString[gm]}
                            </option>
                        ))}
                    </select>
                ) : (
                    gameModeToString[gameMode]
                )}
                <br />
                Player arrangement mode:{' '}
                {onChangePlayerArrangementMode !== undefined ? (
                    <select
                        defaultValue={playerArrangementMode.toString()}
                        onChange={(event: React.FormEvent<HTMLSelectElement>) => onChangePlayerArrangementMode(parseInt(event.currentTarget.value, 10))}
                    >
                        {allPlayerArrangementModes.map(
                            pam =>
                                pam !== PlayerArrangementMode.SpecifyTeams || isTeamGame ? (
                                    <option key={pam} value={pam}>
                                        {playerArrangementModeToString[pam]}
                                    </option>
                                ) : (
                                    undefined
                                ),
                        )}
                    </select>
                ) : (
                    playerArrangementModeToString[playerArrangementMode]
                )}
                <br />
                {playerArrangementMode === PlayerArrangementMode.RandomOrder
                    ? this.renderRandomOrder()
                    : playerArrangementMode === PlayerArrangementMode.ExactOrder
                        ? this.renderExactOrder()
                        : this.renderSpecifyTeams()}
            </div>
        );
    }

    renderRandomOrder() {
        const { usernames } = this.props;

        return (
            <table className={style.table}>
                <tbody>
                    {usernames.map((username, i) => (
                        <tr key={i}>
                            <td className={style.user}>{username}</td>
                            {this.renderKickUserCell(i)}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    renderExactOrder() {
        const { gameMode, usernames, onSwapPositions } = this.props;

        const lastIndex = usernames.size - 1;

        const isTeamGame = gameModeToTeamSize[gameMode] > 1;
        const numTeams = gameModeToNumPlayers[gameMode] / gameModeToTeamSize[gameMode];

        return (
            <table className={style.table}>
                <tbody>
                    {usernames.map((username, i) => (
                        <tr key={i}>
                            <td className={isTeamGame ? teamNumberToCSSClassName[i % numTeams + 1] : style.user}>{username}</td>
                            {onSwapPositions !== undefined ? (
                                <td>{i > 0 ? <input type={'button'} value={'▲'} onClick={() => onSwapPositions(i, i - 1)} /> : undefined}</td>
                            ) : (
                                undefined
                            )}
                            {onSwapPositions !== undefined ? (
                                <td>{i < lastIndex ? <input type={'button'} value={'▼'} onClick={() => onSwapPositions(i, i + 1)} /> : undefined}</td>
                            ) : (
                                undefined
                            )}
                            {this.renderKickUserCell(i)}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    renderSpecifyTeams() {
        const { gameMode, usernames, onSwapPositions } = this.props;

        const specifyTeamsEntries = teamGameModeToSpecifyTeamsEntries[gameMode];
        const numTeams = gameModeToNumPlayers[gameMode] / gameModeToTeamSize[gameMode];

        return (
            <table className={style.table}>
                <tbody>
                    {specifyTeamsEntries.map((entry, i) => {
                        if (entry !== null) {
                            const { index, upIndex, downIndex } = entry;

                            return (
                                <tr key={i}>
                                    <td className={style.user}>{usernames.get(index, null)}</td>
                                    {onSwapPositions !== undefined ? (
                                        <td>
                                            {upIndex !== null ? (
                                                <input type={'button'} value={'▲'} onClick={() => onSwapPositions(index, upIndex)} />
                                            ) : (
                                                undefined
                                            )}
                                        </td>
                                    ) : (
                                        undefined
                                    )}
                                    {onSwapPositions !== undefined ? (
                                        <td>
                                            {downIndex !== null ? (
                                                <input type={'button'} value={'▼'} onClick={() => onSwapPositions(index, downIndex)} />
                                            ) : (
                                                undefined
                                            )}
                                        </td>
                                    ) : (
                                        undefined
                                    )}
                                    {this.renderKickUserCell(index)}
                                </tr>
                            );
                        } else {
                            return (
                                <tr key={i} className={style.versus}>
                                    <td>versus</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        );
    }

    renderKickUserCell(index: number) {
        const { usernames, hostUsername, onKickUser } = this.props;

        if (onKickUser !== undefined) {
            const username = usernames.get(index, null);

            return (
                <td>
                    {username !== null && username !== hostUsername ? <input type={'button'} value={'Kick'} onClick={() => onKickUser(index)} /> : undefined}
                </td>
            );
        }
    }
}

const gameModeToString: { [key: number]: string } = {
    [GameMode.Singles1]: 'Singles 1',
    [GameMode.Singles2]: 'Singles 2',
    [GameMode.Singles3]: 'Singles 3',
    [GameMode.Singles4]: 'Singles 4',
    [GameMode.Singles5]: 'Singles 5',
    [GameMode.Singles6]: 'Singles 6',
    [GameMode.Teams2vs2]: 'Teams 2 vs 2',
    [GameMode.Teams2vs2vs2]: 'Teams 2 vs 2 vs 2',
    [GameMode.Teams3vs3]: 'Teams 3 vs 3',
};

const playerArrangementModeToString: { [key: number]: string } = {
    [PlayerArrangementMode.RandomOrder]: 'Random Order',
    [PlayerArrangementMode.ExactOrder]: 'Exact Order',
    [PlayerArrangementMode.SpecifyTeams]: 'Specify Teams',
};

const allGameModes: GameMode[] = [
    GameMode.Singles1,
    GameMode.Singles2,
    GameMode.Singles3,
    GameMode.Singles4,
    GameMode.Singles5,
    GameMode.Singles6,
    GameMode.Teams2vs2,
    GameMode.Teams2vs2vs2,
    GameMode.Teams3vs3,
];

const allPlayerArrangementModes: PlayerArrangementMode[] = [
    PlayerArrangementMode.RandomOrder,
    PlayerArrangementMode.ExactOrder,
    PlayerArrangementMode.SpecifyTeams,
];

class SpecifyTeamsEntry {
    constructor(public index: number, public upIndex: number | null, public downIndex: number | null) {}
}

const teamGameModeToSpecifyTeamsEntries: { [key: number]: (SpecifyTeamsEntry | null)[] } = {
    [GameMode.Teams2vs2]: [
        new SpecifyTeamsEntry(0, null, 2),
        new SpecifyTeamsEntry(2, 0, 1),
        null,
        new SpecifyTeamsEntry(1, 2, 3),
        new SpecifyTeamsEntry(3, 1, null),
    ],
    [GameMode.Teams2vs2vs2]: [
        new SpecifyTeamsEntry(0, null, 3),
        new SpecifyTeamsEntry(3, 0, 1),
        null,
        new SpecifyTeamsEntry(1, 3, 4),
        new SpecifyTeamsEntry(4, 1, 2),
        null,
        new SpecifyTeamsEntry(2, 4, 5),
        new SpecifyTeamsEntry(5, 2, null),
    ],
    [GameMode.Teams3vs3]: [
        new SpecifyTeamsEntry(0, null, 2),
        new SpecifyTeamsEntry(2, 0, 4),
        new SpecifyTeamsEntry(4, 2, 1),
        null,
        new SpecifyTeamsEntry(1, 4, 3),
        new SpecifyTeamsEntry(3, 1, 5),
        new SpecifyTeamsEntry(5, 3, null),
    ],
};