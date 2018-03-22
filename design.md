# Game history data
Array of:
* Game mode
    * GameModes.Singles (0) or GameModes.Teams (1)
* Time control starting amount (in seconds, null meaning infinite)
* Time control increment amount (in seconds)
* User IDs
    * Array of user IDs in player order
* Tile bag
    * Array of tiles in the order they were drawn
        * 0 for 1A, 1 for 2A, 2 for 3A, ...
        * 12 for 1B, 13 for 2B, ...
    * Tiles that weren't drawn are excluded
* Game actions
    * Only the parameters
    * Timestamp
        * First game action contains milliseconds since Unix epoch
        * Subsequent game actions contain an offset from the previous game action
    * Whether game action was automatically played due to time expiry or forfeit
        * 1 for yes
        * nothing for no
* Game end timestamp
* When forfeits occurred
