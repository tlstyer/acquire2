export enum GameAction {
    StartGame,
    PlayTile,
    SelectNewChain,
    SelectMergerSurvivor,
    SelectChainToDisposeOfNext,
    DisposeOfShares,
    PurchaseShares,
    GameOver,
}

export enum GameBoardType {
    Luxor,
    Tower,
    American,
    Festival,
    Worldwide,
    Continental,
    Imperial,
    Nothing,
    NothingYet,
    CantPlayEver,
    IHaveThis,
    WillPutLonelyTileDown,
    HaveNeighboringTileToo,
    WillFormNewChain,
    WillMergeChains,
    CantPlayNow,
    Max,
}

export enum GameHistoryMessage {
    TurnBegan,
    DrewPositionTile,
    StartedGame,
    DrewTile,
    HasNoPlayableTile,
    PlayedTile,
    FormedChain,
    MergedChains,
    SelectedMergerSurvivor,
    SelectedChainToDisposeOfNext,
    ReceivedBonus,
    DisposedOfShares,
    CouldNotAffordAnyShares,
    PurchasedShares,
    DrewLastTile,
    ReplacedDeadTile,
    EndedGame,
    NoTilesPlayedForEntireRound,
    AllTilesPlayed,
}

export enum ScoreBoardIndex {
    Luxor,
    Tower,
    American,
    Festival,
    Worldwide,
    Continental,
    Imperial,
    Cash,
    Net,
    Max,
}

export enum Tile {
    Unknown = -1,
}
