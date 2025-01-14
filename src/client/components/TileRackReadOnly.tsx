import { createMemo, For, JSX, Match, Switch } from 'solid-js';
import { toTileString } from '../../common/helpers';
import { PB_GameBoardType } from '../../common/pb';
import stylesApp from '../App.module.css';
import { gameBoardTypeToCSSClassName } from '../helpers';
import { allTileDataFromTilesAndTypes } from './TileRack';
import styles from './TileRackReadOnly.module.css';

export function TileRackReadOnly(props: {
  tiles: (number | null)[];
  types: (PB_GameBoardType | null)[];
  buttonSize: number;
}) {
  const allTileData = allTileDataFromTilesAndTypes(
    // eslint-disable-next-line solid/reactivity
    () => props.tiles,
    // eslint-disable-next-line solid/reactivity
    () => props.types,
  );

  const buttonStyle = createMemo<JSX.CSSProperties>(() => ({
    width: `${props.buttonSize}px`,
    height: `${props.buttonSize}px`,
  }));

  return (
    <div class={styles.root} style={{ 'font-size': `${Math.floor(props.buttonSize * 0.4)}px` }}>
      <For each={allTileData}>
        {(tileData) => (
          <Switch>
            <Match when={tileData.tile !== null && tileData.type !== null}>
              <div
                classList={{
                  [styles.button]: true,
                  [gameBoardTypeToCSSClassName.get(tileData.type!)!]: true,
                }}
                style={buttonStyle()}
              >
                <div>{toTileString(tileData.tile!)}</div>
              </div>
            </Match>
            <Match when={true}>
              <div
                classList={{
                  [styles.button]: true,
                  [stylesApp.invisible]: true,
                }}
                style={buttonStyle()}
              >
                ?
              </div>
            </Match>
          </Switch>
        )}
      </For>
    </div>
  );
}
