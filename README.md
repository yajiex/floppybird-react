#Floppy Bird React

This project is written with [React](https://facebook.github.io/react/index.html), it is a fork of https://github.com/nebez/floppybird, the original project is written with primitive HTML/CSS/JavaScript.
My change focuses on `index.html` and `index.jsx`, the original `css` files and assets files keep unchanged.

##Setup

- Clone the repo: `git clone https://github.com/yajiex/floppybird-react.git`
- Install the dependencies: `npm install --save-dev`
- Install dev tools: `npm install webpack-dev-server -g`
- **Optional (Not sure why installed locally not work)** Install ESLint: `npm install -g --no-optional eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint`

##Build

- Dev build: `npm run dev-build`
- Production build: `npm run product-build`

##Run

- Dev build: [http://localhost:8080/dist](http://localhost:8080/dist)
- Production build: directly open `./dist/index.html`

##Architecture

    ├───dist
    │       bundle.js
    │       index.html
    │
    └───src
        ├───components
        │   ├───GameScreen
        │   │   │   GameScreen.css
        │   │   │   GameScreen.jsx
        │   │   │
        │   │   ├───assets
        │   │   │
        │   │   ├───FlyArea
        │   │   │   │   FlyArea.css
        │   │   │   │   FlyArea.jsx
        │   │   │   │
        │   │   │   ├───BigScore
        │   │   │   │   │   BigScore.css
        │   │   │   │   │   BigScore.jsx
        │   │   │   │   │
        │   │   │   │   └───assets
        │   │   │   │
        │   │   │   ├───Ceiling
        │   │   │   │   │   Ceiling.css
        │   │   │   │   │   Ceiling.jsx
        │   │   │   │   │
        │   │   │   │   └───assets
        │   │   │   │
        │   │   │   ├───Pipes
        │   │   │   │   │   Pipes.jsx
        │   │   │   │   │
        │   │   │   │   └───Pipe
        │   │   │   │       │   Pipe.css
        │   │   │   │       │   Pipe.jsx
        │   │   │   │       │
        │   │   │   │       └───assets
        │   │   │   │
        │   │   │   ├───Player
        │   │   │   │   │   Player.css
        │   │   │   │   │   Player.jsx
        │   │   │   │   │
        │   │   │   │   └───assets
        │   │   │   │
        │   │   │   ├───ScoreBoard
        │   │   │   │   │   ScoreBoard.css
        │   │   │   │   │   ScoreBoard.jsx
        │   │   │   │   │
        │   │   │   │   ├───assets
        │   │   │   │   │
        │   │   │   │   ├───CurrentScore
        │   │   │   │   │   │   CurrentScore.css
        │   │   │   │   │   │   CurrentScore.jsx
        │   │   │   │   │   │
        │   │   │   │   │   └───assets
        │   │   │   │   │
        │   │   │   │   ├───HighScore
        │   │   │   │   │   │   HighScore.css
        │   │   │   │   │   │   HighScore.jsx
        │   │   │   │   │   │
        │   │   │   │   │   └───assets
        │   │   │   │   │
        │   │   │   │   ├───Medal
        │   │   │   │   │   │   Medal.css
        │   │   │   │   │   │   Medal.jsx
        │   │   │   │   │   │
        │   │   │   │   │   └───assets
        │   │   │   │   │
        │   │   │   │   └───Replay
        │   │   │   │       │   Replay.css
        │   │   │   │       │   Replay.jsx
        │   │   │   │       │
        │   │   │   │       └───assets
        │   │   │   │
        │   │   │   └───Splash
        │   │   │       │   Splash.css
        │   │   │       │   Splash.jsx
        │   │   │       │
        │   │   │       └───assets
        │   │   │
        │   │   └───Land
        │   │       │   Land.css
        │   │       │   Land.jsx
        │   │       │
        │   │       └───assets
        │   │
        │   ├───Sound
        │   │   │   Sound.js
        │   │   │
        │   │   └───assets
        │   │
        │   └───Utils
        │           Utils.js
        │
        ├───index
        │   │   index.jsx
        │   │
        │   └───css
        │           index.css
        │           reset.css
        │
        └───shared
            └───css
                    animations.css