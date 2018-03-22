# Game history data
Array of:
* Game mode
    * GameModes.Singles (0) or GameModes.Teams (1)
* User IDs
    * Array of user IDs in player order
* Tile bag
    * Array of tiles in the order they were drawn
        * 0 for 1A, 1 for 2A, 2 for 3A, ...
        * 12 for 1B, 13 for 2B, ...
    * Tiles that weren't drawn are excluded
* Game actions
    * Only the parameters
* Game action timestamps
    * First entry is a timestamp (milliseconds since Unix epoch)
    * Subsequent entries are offsets from the previous entry
* Game end timestamp

Might need to include:
* Time controls
    * Starting amount (in seconds, null meaning infinite)
    * Increment amount (in seconds)
* Moves that were automatically played due to time expiry or forfeit
* When forfeits occurred
