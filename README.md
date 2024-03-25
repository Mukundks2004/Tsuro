# TsuroLocal

## IMPORTANT NOTE

- WANT TO CHANGE THIS TO BE HOSTED SO THAT MULTIPLE PEOPLE CAN PLAY AT ONCE
how to do this??

1) need to have some kind of server subscription so that I can have a server running, haven't decided yet if I want this server to be local or remote but I don't think it matters
2) Have multiple clients that can access the server at once (ideally 1-2)
3) When a client connects to the server a "session" is established. Google what this means.
4) A client enters a player name on the start page (this is what initiates the session) and proceed to the game selection page
5) game selection page displays all games that are currently active, have not decided yet but will likely discard games if there are no active players to prevent lag and memory wastage etc.
    1) When you join you can pick a player to play as, then select ready to confirm. The greyed out options are the players that have already chosen.
    2) When all the players are ready the host can click start game.
6) When you enter a game, you take turns playing and the game automatically cycles the turns. You do not get to see other players' inventories etc.
7) When a player gets eliminated, they get greyed out (this indicates whether they are still playing, not whether they are connected or not). Their turn gets 'skipped' every time it cycles back around to them.
    - Side note: maybe I can send API calls exclusively when needed, so I can have lightning loading speeds (rather than a periodic watseful call every second, where most seconds nothing would happen). Eg, when you click, send a ping to every game to calculate score.
8) When all players are eliminated, everyone gets to see the winner screen. When they close it they get sent back to menu. When all players close the game, the game gets discarded (haven't yet decided how to implement this). There is currently no way to restart the game with the same players, maybe I will implement this in the future.
    - Note: all of this relies on a cooperative host
9) You can create a game (become a host) by just clicking the create game button and selecting the number of players. Once you have done this, you are locked in and cannot change the number of players. You must wait until all the spots fill up. You can only join one at a time and leaving the game will end it for everyone that has joined (eg: you have been disconnected).

TODO: add all the above

## Some of these are not implemented yet:
- Can play tsuro with up to four players on one computer
- Can see who is looking at the board by selecting using the radio button at the top of screen4
- When a player is not playing (they died) radio button is greyed out)
- When you flick to a current player you can see their inventory
- All players see the same board with tiles coloured base on who placed them, and paths coloured based on who traversed them
- When a player is eliminated the turn no longer automatically rotates to them
- When the game ends a model pops up with a button to download the finished board, and the modal displays the list of winners
- You can select colours on the start page
- You cannot go back to the start page except using the back button and if you do the game will be reset
- As of right now no option to do online multiplayer

## Things to fix/Add (explicit)
- radio button
- player random generation at start of game, still have not determined how that will work
- max number of players increase from 4-> 8

## TODO:
- separate classes in tile into different files
- all server stuff
- proper generation of tiles without having to list them out
- make it so that u can list the two connections in any order not just smaller to larger ex 12 = 21 etc
