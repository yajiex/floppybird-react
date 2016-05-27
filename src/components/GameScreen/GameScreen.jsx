import React from 'react';

import Land from './Land/Land.jsx';
import FlyArea from './FlyArea/FlyArea.jsx';
import Utils from '../Utils/Utils.js';
import Sound from '../Sound/Sound.js';
import styles from './GameScreen.css';

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleFlyAreaClick = this.handleFlyAreaClick.bind(this);
    this.screenState = Object.freeze({
      SplashScreen: 0,
      GameScreen: 1,
      ScoreScreen: 2,
    });
    this.pipeHeight = 200;
    this.pipeWidth = 52;
    this.gravity = 0.25;
    this.jump = -4.6;
    this.isInCompatiable = Utils.isInCompatible();
    this.sound = new Sound();

    this.showSplash();
  }

  componentDidMount() {
    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', this.screenClick.bind(this), false);
    } else {
      document.addEventListener('mousedown', this.screenClick.bind(this), false);
    }

    document.addEventListener('keydown', this.keyDown.bind(this), false);
  }

  setBigScore(erase) {
    this.setState({ bigScoreErase: erase });
  }

  setMedal() {
    if (this.state.score < 10) {
      this.setState({ medal: null });
      return false;
    }

    if (this.state.score >= 10) {
      this.setState({ medal: 'bronze' });
    }
    if (this.state.score >= 20) {
      this.setState({ medal: 'silver' });
    }
    if (this.state.score >= 30) {
      this.setState({ medal: 'gold' });
    }
    if (this.state.score >= 40) {
      this.setState({ medal: 'platinum' });
    }

    return true;
  }

  playerDead() {
    // stop animating everything!
    this.setState({ animationPlayState: 'paused' });

    // drop the bird to the floor
    this.refs.flyArea.dropPlayerToFloor();

    this.setState({ currentScreen: this.screenState.ScoreScreen });

    // destroy our gameloops
    clearInterval(this.state.loopGameloop);
    clearInterval(this.state.loopPipeloop);
    this.setState({ loopGameloop: null });
    this.setState({ loopPipeloop: null });
    if (this.isInCompatiable) {
      this.showScore();
    } else {
      this.sound.playSoundHit(() => {
        this.sound.playSoundDie(() => {
          this.showScore();
        });
      });
    }
  }

  showScore() {
    // unhide us
    this.setState({ scoreBoardDisplay: 'block' });

    // remove the big score
    this.setBigScore(true);

    if (this.state.score > this.state.highScore) {
      this.setState({ highScore: this.state.score });
      Utils.setCookie('highScore', this.state.highScore, 999);
    }

    const wonMedal = this.setMedal();

    this.sound.playSoundSwoosh();

    // show the scoreboard
    this.setState({ scoreBoardY: 40, scoreBoardOpacity: 0, replayY: 40, replayOpacity: 0 });
    this.refs.flyArea.showScoreBoard(() => {
      this.sound.playSoundSwoosh();
      this.refs.flyArea.showReplay();

      if (wonMedal) {
        this.setState({ medalScale: 2, medalOpacity: 0 });
        this.refs.flyArea.showMedal();
      }
    });
  }

  gameloop() {
    this.setState({ playerVelocity: this.state.playerVelocity + this.gravity });
    this.setState({ playerTop: this.state.playerTop + this.state.playerVelocity });
    this.updatePlayer();
    // create the bounding box
    const box = this.refs.flyArea.getPlayerBoundingClientRect();
    const origwidth = 34.0;
    const origheight = 24.0;

    const boxwidth = origwidth - (Math.sin(Math.abs(this.state.playerRotation) / 90) * 8);
    const boxheight = (origheight + box.height) / 2;
    const boxleft = ((box.width - boxwidth) / 2) + box.left;
    const boxtop = ((box.height - boxheight) / 2) + box.top;
    const boxright = boxleft + boxwidth;
    const boxbottom = boxtop + boxheight;

    // did we hit the ground?
    if (box.bottom >= this.refs.land.getOffsetTop()) {
      this.playerDead();
      return;
    }

    // have they tried to escape through the ceiling? :o
    if (boxtop <= this.refs.flyArea.getCeilingTopHeight()) {
      this.setState({ playerTop: 0 });
    }

    // we can't go any further without a pipe
    if (this.refs.flyArea.getPipesCount() === 0) {
      return;
    }

    // determine the bounding box of the next pipes inner area
    const nextpipeupper = this.refs.flyArea.getNextPipeUpper();

    const pipetop = nextpipeupper.offset().top + nextpipeupper.height();
    // for some reason it starts at the inner pipes offset, not the outer pipes.
    const pipeleft = nextpipeupper.offset().left - 2;
    const piperight = pipeleft + this.pipeWidth;
    const pipebottom = pipetop + this.pipeHeight;

    // have we gotten inside the pipe yet?
    if (boxright > pipeleft) {
      // we're within the pipe, have we passed between upper and lower pipes?
      if (boxtop > pipetop && boxbottom < pipebottom) {
        // yeah! we're within bounds

      } else {
        // no! we touched the pipe
        this.playerDead();
        return;
      }
    }


    // have we passed the imminent danger?
    if (boxleft > piperight) {
      // yes, remove it
      this.refs.flyArea.slicePipes();

      // and score a point
      this.playerScore();
    }
  }

  updatePipes() {
    // Do any pipes need removal?
    const padding = 80;
    // double padding (for top and bottom)
    const constraint = this.refs.flyArea.getFlyAreaHeight() - this.pipeHeight - (padding * 2);
    // add lower padding
    const topHeight = Math.floor((Math.random() * constraint) + padding);
    const bottomHeight = (this.refs.flyArea.getFlyAreaHeight() - this.pipeHeight) - topHeight;
    this.refs.flyArea.updatePipes({ topHeight, bottomHeight });
  }

  playerJump() {
    this.setState({ playerVelocity: this.jump });
    this.sound.playSoundJump();
  }

  playerScore() {
    this.setState({ score: this.state.score + 1 });
    this.sound.playSoundScore();
    this.setBigScore();
  }

  updatePlayer() {
    this.setState({ playerRotation: Math.min((this.state.playerVelocity / 10) * 90, 90) });
  }

  showSplash() {
    const savedScore = Utils.getCookie('highScore');
    const highScore = savedScore === '' ? 0 : parseInt(savedScore, 10);

    this.state = {
      currentScreen: this.screenState.SplashScreen,
      playerVelocity: 0,
      playerTop: 180,
      playerRotation: 0,
      playerY: 0,
      score: 0,
      highScore,
      animationPlayState: 'running',
      loopGameloop: null,
      loopPipeloop: null,
      medal: null,
    };

    this.sound.playSoundSwoosh();

    if (this.refs.flyArea) {
      this.refs.flyArea.initialPipesCount();
      this.refs.flyArea.showSplash();
    }
  }

  screenClick() {
    if (this.state.currentScreen === this.screenState.GameScreen) {
      this.playerJump();
    } else if (this.state.currentScreen === this.screenState.SplashScreen) {
      this.startGame();
    }
  }

  keyDown(e) {
    if (e.keyCode === 32) {
      if (this.state.currentScreen === this.screenState.ScoreScreen) {
        this.refs.flyArea.triggerReplayClick();
      } else {
        this.screenClick();
      }
    }
  }

  startGame() {
    this.setState({ currentScreen: this.screenState.GameScreen });
    this.refs.flyArea.hideSplash();
    this.setBigScore();

    const updateRate = 1000.0 / 60.0;
    this.setState({ loopGameloop: setInterval(this.gameloop.bind(this), updateRate) });
    this.setState({ loopPipeloop: setInterval(this.updatePipes.bind(this), 1400) });
    this.playerJump();
  }

  handleFlyAreaClick() {
    this.sound.playSoundSwoosh();
    this.showSplash();
  }

  render() {
    return (<div className={styles.gameScreen}>
      <div
        className={styles.sky}
        style={{ animationPlayState: this.state.animationPlayState,
           WebkitAnimationPlayState: this.state.animationPlayState }}
      >
        <FlyArea
          ref="flyArea"

          bigScoreErase={this.state.bigScoreErase}
          score={this.state.score}

          scoreBoardDisplay={this.state.scoreBoardDisplay}
          scoreBoardY={this.state.scoreBoardY}

          playerTop={this.state.playerTop}
          playerY={this.state.playerY}
          playerRotation={this.state.playerRotation}

          highScore={this.state.highScore}
          replayY={this.state.replayY}
          replayOpacity={this.state.replayOpacity}

          animationPlayState={this.state.animationPlayState}
          onClick={this.handleFlyAreaClick}

          medal={this.state.medal}
          medalScale={this.state.medalScale}
          medalOpacity={this.state.medalOpacity}
        />
      </div>
      <Land ref="land" animationPlayState={this.state.animationPlayState} />
    </div>);
  }
}
