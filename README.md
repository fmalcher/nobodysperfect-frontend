# Nobody is Perfect Frontend Application

Frontend for the board game ["Nobody is perfect"](https://www.ravensburger.de/produkte/spiele/erwachsenenspiele/nobody-is-perfect-27225/index.html) to make it virtually playable via video conference.
Be aware that this is a rather hacky solution that's supposed to "just work" and nothing more.

## Installation and run

* Clone this repo.
* Install and run an instance of the [backend server](https://github.com/fmalcher/nobodysperfect-backend).
* Configure your backend host and port in the environment files in `src/environments`.

```
npm i
ng serve
```

Open your browser: http://localhost:4200


## Deployment

Build and deployment have to be done manually, there is no CI involved at the moment.
To publish to GitHub Pages:

```
npm run deploy
```

It will do a prod build and push to the `ghpages` branch of the repo.

## Architecture

For the sake of simplicity, data transfer between backend and frontend works with polling.
The server persists all state in a static JSON file `data.json`.
The frontend can poll this JSON file to get the current data.
All calls from frontend to backend are HTTP POST calls that change data on the server.

We are aware of the limitations of this approach, however with HTTP caching it should be quite tolerable to use polling.

## Game States

The phases of the game are determined by a state index.

| State  | Description | Player | Moderator |
|---|---|---|---|
| `0` | `idle` |  | enter question |
| `1` | `giveAnswer` | enter answer |  |
| `2` | `waitForResults` |  | edit answers |
| `3` | `chooseAnswer` | choose answer |  |
| `4` | `resultsFull` | see results anonymized |  |
| `5` | `resultsFullWithAuthor` | see results and round score full |  |
| `6` | `showFullScore` | see full score |  |
