import { PB_GameBoardType } from '../../../common/pb';
import { TileRackReadOnly } from '../../components/TileRackReadOnly';

export function TileRackReadOnlyExamples() {
  return (
    <>
      <p>
        <TileRackReadOnly
          tiles={[1, 28, 55, 82, 92, 40]}
          types={[
            PB_GameBoardType.LUXOR,
            PB_GameBoardType.TOWER,
            PB_GameBoardType.AMERICAN,
            PB_GameBoardType.FESTIVAL,
            PB_GameBoardType.WORLDWIDE,
            PB_GameBoardType.CONTINENTAL,
          ]}
          buttonSize={40}
        />
      </p>
      <p>
        <TileRackReadOnly
          tiles={[71, null, 99, 12, 8, 17]}
          types={[
            PB_GameBoardType.IMPERIAL,
            null,
            PB_GameBoardType.WILL_MERGE_CHAINS,
            PB_GameBoardType.WILL_PUT_LONELY_TILE_DOWN,
            PB_GameBoardType.HAVE_NEIGHBORING_TILE_TOO,
            PB_GameBoardType.HAVE_NEIGHBORING_TILE_TOO,
          ]}
          buttonSize={40}
        />
      </p>
      <p>
        <TileRackReadOnly
          tiles={[null, 86, null, 38, null, 74]}
          types={[
            null,
            PB_GameBoardType.CANT_PLAY_EVER,
            null,
            PB_GameBoardType.WILL_FORM_NEW_CHAIN,
            null,
            PB_GameBoardType.CANT_PLAY_NOW,
          ]}
          buttonSize={40}
        />
      </p>
    </>
  );
}
