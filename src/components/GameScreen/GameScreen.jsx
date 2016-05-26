import React from 'react';

import Land from './Land/Land.jsx';
import FlyArea from './FlyArea/FlyArea.jsx';
import CookieUtils from '../utils/Utils.js';
import Sound from '../Sound/Sound.js';

export default class GameScreen extends React.Component {
    constructor(props) {
        super(props);
        this.screenState = Object.freeze({
            SplashScreen: 0,
            GameScreen: 1,
            ScoreScreen: 2
        });
        this.pipeHeight = 200;
        this.pipeWidth = 52;
        this.gravity = 0.25;
        this.jump = -4.6;
        this.sound = new Sound();

        this.showSplash();
    }

    componentDidMount() {
        if ("ontouchstart" in window) {
            document.addEventListener("touchstart", this.screenClick.bind(this), false);
        } else {
            document.addEventListener("mousedown", this.screenClick.bind(this), false);
        }

        document.addEventListener("keydown", this.keyDown.bind(this), false);
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

    screenClick() {
        if (this.state.currentScreen === this.screenState.GameScreen) {
            this.playerJump();
        } else if (this.state.currentScreen === this.screenState.SplashScreen) {
            this.startGame();
        }
    }

    showSplash() {
        var savedScore = CookieUtils.getCookie("highScore");
        var highScore = savedScore === "" ? 0 : parseInt(savedScore);

        this.state = {
            currentScreen: this.screenState.SplashScreen,
            playerVelocity: 0,
            playerTop: 180,
            playerRotation: 0,
            playerY: 0,
            score: 0,
            highScore: highScore,
            animationPlayState: "running",
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

    updatePlayer() {
        this.setState({playerRotation: Math.min((this.state.playerVelocity / 10) * 90, 90)});
    }

    playerScore() {
        this.setState({score: this.state.score + 1});
        this.sound.playSoundScore();
        this.setBigScore();
    }

    playerDead() {
        //stop animating everything!
        this.setState({animationPlayState: "paused"});

        //drop the bird to the floor
        this.refs.flyArea.dropPlayerToFloor();

        //it's time to change states. as of now we're considered ScoreScreen to disable left click/flying
        this.setState({currentScreen: this.screenState.ScoreScreen});

        //destroy our gameloops
        clearInterval(this.state.loopGameloop);
        clearInterval(this.state.loopPipeloop);
        this.setState({loopGameloop: null});
        this.setState({loopPipeloop: null});

        this.sound.playSoundHit(function () {
            this.sound.playSoundDie(function () {
                this.showScore();
            }.bind(this));
        }.bind(this));
    }

    setMedal() {
        if (this.state.score < 10) {
            this.setState({medal: null});
            return false;
        }

        if (this.state.score >= 10) {
            this.setState({medal: "bronze"});
        }
        if (this.state.score >= 20) {
            this.setState({medal: "silver"});
        }
        if (this.state.score >= 30) {
            this.setState({medal: "gold"});
        }
        if (this.state.score >= 40) {
            this.setState({medal: "platinum"});
        }

        return true;
    }

    showScore() {
        //unhide us
        this.setState({scoreBoardDisplay: "block"});

        //remove the big score
        this.setBigScore(true);

        if (this.state.score > this.state.highScore) {
            this.setState({highScore: this.state.score});
            CookieUtils.setCookie("highScore", this.state.highScore, 999);
        }

        var wonMedal = this.setMedal();

        this.sound.playSoundSwoosh();

        //show the scoreboard
        this.setState({scoreBoardY: "40px", scoreBoardOpacity: 0, replayY: "40px", replayOpacity: 0});
        this.refs.flyArea.showScoreBoard(function () {
            this.sound.playSoundSwoosh();
            this.refs.flyArea.showReplay();

            if (wonMedal) {
                this.setState({medalScale: 2, medalOpacity: 0});
                this.refs.flyArea.showMedal();
            }
        }.bind(this));

    }

    gameloop() {
        this.setState({playerVelocity: this.state.playerVelocity + this.gravity});
        this.setState({playerTop: this.state.playerTop + this.state.playerVelocity});
        this.updatePlayer();
        //create the bounding box
        var box = this.refs.flyArea.getPlayerBoundingClientRect();
        var origwidth = 34.0;
        var origheight = 24.0;

        var boxwidth = origwidth - (Math.sin(Math.abs(this.state.playerRotation) / 90) * 8);
        var boxheight = (origheight + box.height) / 2;
        var boxleft = ((box.width - boxwidth) / 2) + box.left;
        var boxtop = ((box.height - boxheight) / 2) + box.top;
        var boxright = boxleft + boxwidth;
        var boxbottom = boxtop + boxheight;

        //did we hit the ground?
        if (box.bottom >= this.refs.land.getOffsetTop()) {
            this.playerDead();
            return;
        }

        //have they tried to escape through the ceiling? :o
        if (boxtop <= this.refs.flyArea.getCeilingTopHeight()) {
            this.setState({playerTop: 0});
        }

        //we can't go any further without a pipe
        if (this.refs.flyArea.getPipesCount() === 0) {
            return;
        }

        //determine the bounding box of the next pipes inner area
        var nextpipeupper = this.refs.flyArea.getNextPipeUpper();

        var pipetop = nextpipeupper.offset().top + nextpipeupper.height();
        var pipeleft = nextpipeupper.offset().left - 2; // for some reason it starts at the inner pipes offset, not the outer pipes.
        var piperight = pipeleft + this.pipeWidth;
        var pipebottom = pipetop + this.pipeHeight;

        //have we gotten inside the pipe yet?
        if (boxright > pipeleft) {
            //we're within the pipe, have we passed between upper and lower pipes?
            if (boxtop > pipetop && boxbottom < pipebottom) {
                //yeah! we're within bounds

            }
            else {
                //no! we touched the pipe
                this.playerDead();
                return;
            }
        }


        //have we passed the imminent danger?
        if (boxleft > piperight) {
            //yes, remove it
            this.refs.flyArea.slicePipes();

            //and score a point
            this.playerScore();
        }
    }

    updatePipes() {
        //Do any pipes need removal?
        var padding = 80;
        var constraint = this.refs.flyArea.getFlyAreaHeight() - this.pipeHeight - (padding * 2); //double padding (for top and bottom)
        var topHeight = Math.floor((Math.random() * constraint) + padding); //add lower padding
        var bottomHeight = (this.refs.flyArea.getFlyAreaHeight() - this.pipeHeight) - topHeight;
        this.refs.flyArea.updatePipes({topHeight: topHeight, bottomHeight: bottomHeight});
    }

    playerJump() {
        this.setState({playerVelocity: this.jump});
        this.sound.playSoundJump();
    }

    setBigScore(erase) {
        this.setState({bigScoreErase: erase});
    }

    startGame() {
        this.setState({currentScreen: this.screenState.GameScreen});
        this.refs.flyArea.hideSplash();
        this.setBigScore();

        var updateRate = 1000.0 / 60.0;
        this.setState({loopGameloop: setInterval(this.gameloop.bind(this), updateRate)});
        this.setState({loopPipeloop: setInterval(this.updatePipes.bind(this), 1400)});
        this.playerJump();
    }

    handleFlyAreaClick() {
        this.sound.playSoundSwoosh();
        this.showSplash();
    }

    render() {
        return <div>
            <div id="sky"
                 style={{ animationPlayState: this.state.animationPlayState, WebkitAnimationPlayState: this.state.animationPlayState }}>
                <FlyArea ref="flyArea"

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
                         onClick={this.handleFlyAreaClick.bind(this) }

                         medal={this.state.medal}
                         medalScale={this.state.medalScale}
                         medalOpacity={this.state.medalOpacity}/>
            </div>
            <Land ref="land" animationPlayState={this.state.animationPlayState}/>
        </div>
    }
}