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

export enum GameMode {
    Singles1 = 1,
    Singles2,
    Singles3,
    Singles4,
    Singles5,
    Singles6,
    Teams2vs2,
    Teams2vs2vs2,
    Teams3vs3,
}

export enum PlayerArrangementMode {
    RandomOrder,
    ExactOrder,
    SpecifyTeams,
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