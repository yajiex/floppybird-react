import '../css/reset.css';
import '../css/main.css';

import $ from 'jquery';
import 'jquery.transit';
import buzz from 'node-buzz';

import React from 'react';
import ReactDOM from 'react-dom';

class Sound {
    constructor() {
        var volume = 30;
        this.soundJump = new buzz.sound(require("../assets/sounds/sfx_wing.ogg"));
        this.soundScore = new buzz.sound(require("../assets/sounds/sfx_point.ogg"));
        this.soundHit = new buzz.sound(require("../assets/sounds/sfx_hit.ogg"));
        this.soundDie = new buzz.sound(require("../assets/sounds/sfx_die.ogg"));
        this.soundSwoosh = new buzz.sound(require("../assets/sounds/sfx_swooshing.ogg"));
        buzz.all().setVolume(volume);
    }

    playSoundJump() {
        this.soundJump.stop();
        this.soundJump.play();
    }

    playSoundScore() {
        this.soundScore.stop();
        this.soundScore.play();
    }

    playSoundHit(callback) {
        this.soundHit.play().bindOnce("ended", callback);
    }

    playSoundDie(callback) {
        this.soundDie.play().bindOnce("ended", callback);
    }

    playSoundSwoosh() {
        this.soundSwoosh.stop();
        this.soundSwoosh.play();
    }
}

class Ceiling extends React.Component {
    componentDidMount() {
        var ceiling = $(this.refs.ceiling);
        this.topHeight = ceiling.offset().top + ceiling.height();
    }

    getTopHeight() {
        return this.topHeight;
    }

    render() {
        return <div ref="ceiling" id="ceiling"
                    style={{animationPlayState: this.props.animationPlayState,WebkitAnimationPlayState: this.props.animationPlayState}}>

        </div>
    }
}

class Land extends React.Component {
    componentDidMount() {
        this.offsetTop = $(this.refs.land).offset().top;
    }

    getOffsetTop() {
        return this.offsetTop;
    }

    render() {
        return <div ref="land" id="land"
                    style={{ animationPlayState: this.props.animationPlayState, WebkitAnimationPlayState: this.props.animationPlayState }}>
            <div id="debug"></div>
        </div>
    }
}

const BigScore = (props) => {
    var digits = props.erase ? [] : props.score.toString().split('');
    return <div id="bigscore">
        {
            digits.map(function (digit, index) {
                return <img key={"digit" + index} src={require('../assets/font_big_' + digit + '.png')} alt={digit}/>;
            })
        }
    </div>
};

class Splash extends React.Component {
    show() {
        $(this.refs.splash).transition({opacity: 1}, 2000, 'ease');
    }

    hide() {
        $(this.refs.splash).stop();
        $(this.refs.splash).transition({opacity: 0}, 500, 'erase');
    }

    render() {
        return <div id="splash" ref="splash"></div>
    }
}

class Player extends React.Component {
    getBoundingClientRect() {
        return this.refs.player.getBoundingClientRect();
    }

    dropToFloor(flyAreaHeight) {
        var playerBottom = $(this.refs.player).position().top + $(this.refs.player).width();
        var moveY = Math.max(0, flyAreaHeight - playerBottom);
        $(this.refs.player).transition({y: moveY, rotate: 90}, 1000, 'easeInOutCubit');
    }

    render() {
        return <div ref="player" id="player" className="bird" style={{
            y: this.props.y,
            top: this.props.top,
            transform: 'translate(0px, 0px) rotate(' + this.props.rotation + 'deg)',
            animationPlayState: this.props.animationPlayState,
            WebkitAnimationPlayState: this.props.animationPlayState,
        }}>
        </div>
    }
}

class Medal extends React.Component {
    show() {
        $(this.refs.medal).transition({opacity: 1, scale: 1}, 1200, 'ease');
    }

    render() {
        return <div id="medal" ref="medal" style={{ scale: this.props.scale, opacity: this.props.opacity }}>
            {this.props.medal === null ? "" :
                <img src={require("../assets/medal_" + this.props.medal + ".png")} alt={"'" + this.props.medal + "'"}/>}
        </div>
    }
}


const CurrentScore = (props) => {
    var digits = props.score.toString().split('');
    return <div id="currentscore">
        {
            digits.map(function (digit, index) {
                return <img key={"digit" + index} src={require('../assets/font_small_' + digit + '.png')} alt={digit}/>;
            })
        }
    </div>
};

const HighScore = (props) => {
    var digits = props.highScore.toString().split('');
    return <div id="highscore">
        {
            digits.map(function (digit, index) {
                return <img key={"digit" + index} src={require('../assets/font_small_' + digit + '.png')} alt={digit}/>;
            })
        }
    </div>
};

class Replay extends React.Component {
    constructor(props) {
        super(props);
    }

    triggerClick() {
        $(this.refs.replay).click();
    }

    handleClick() {
        if (!this.replayclickable) {
            return;
        } else {
            this.replayclickable = false;
        }

        this.props.onClick();
    }

    show() {
        $(this.refs.replay).transition({y: "0px", opacity: 1}, 600, 'ease');
        this.replayclickable = true;
    }

    render() {
        return <div id="replay" ref="replay" style={{ y: this.props.y, opacity: this.props.opacity }}
                    onClick={this.handleClick.bind(this) }>
            <img src={require("../assets/replay.png")} alt="replay"/>
        </div>
    }
}

class ScoreBoard extends React.Component {
    triggerReplayClick() {
        this.refs.replay.triggerClick();
    }

    handleClick() {
        this.hide(function () {
            this.setState({display: "none"});
            this.props.onClick();
        }.bind(this));
    }

    show(callback) {
        $(this.refs.scoreBoard).transition({y: "0px", opacity: 1}, 600, 'ease', callback);
    }

    hide(callback) {
        $(this.refs.scoreBoard).transition({y: "-40px", opacity: 0}, 1000, 'ease', callback);
    }

    showMedal() {
        this.refs.medal.show();
    }

    showReplay() {
        this.refs.replay.show();
    }

    render() {
        return <div id="scoreboard" ref="scoreBoard"
                    style={{ display: this.props.display, y: this.props.y, opacity: this.props.opacity }}>
            <Medal ref="medal" medal={this.props.medal} scale={this.props.medalScale}
                   opacity={this.props.medalOpacity}/>
            <CurrentScore score={this.props.score}/>
            <HighScore highScore={this.props.highScore}/>
            <Replay ref="replay" y={this.props.replayY} opacity={this.props.replayOpacity}
                    onClick={this.handleClick.bind(this) }/>
        </div>
    }
}

class Pipe extends React.Component {
    getPositionLeft() {
        return $(this.refs.pipe).position().left;
    }

    getPipeUpper() {
        return $(this.refs.pipeUpper);
    }

    render() {
        return <div className="pipe" ref="pipe"
                    style={{ animationPlayState: this.props.animationPlayState, WebkitAnimationPlayState: this.props.animationPlayState }}>
            <div ref="pipeUpper" className="pipe_upper" style={{ height: this.props.topHeight }}>
            </div>
            <div className="pipe_lower" style={{ height: this.props.bottomHeight }}>
            </div>
        </div>
    }
}

class Pipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pipes: []
        };
        this.pipes = [];
        this.index = 0;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.animationPlayState !== nextProps.animationPlayState) {
            return true;
        }
        if (this.state.pipes.length !== nextState.pipes.length) {
            return true;
        }
        if (this.state.pipes[0] && nextState.pipes[0] && this.state.pipes[0].refName !== nextState.pipes[0].refName) {
            return true;
        }

        return false;
    }

    getNextPipeUpper() {
        return this.refs[this.pipes[0].refName].getPipeUpper();
    }

    initialPipesCount() {
        this.pipes = [];
        this.setState({pipes: []});
    }

    getPipesCount() {
        return this.pipes.length;
    }

    slicePipes() {
        this.pipes.splice(0, 1);
    }

    updatePipes(newPipeProp) {
        // Filter refNames, return an array whose left > -100
        var pipes = this.state.pipes.filter(function (pipe) {
            return this.refs[pipe.refName].getPositionLeft() > -100;
        }.bind(this));

        var obj = Object.assign(newPipeProp, {refName: "pipe" + this.index++});
        this.setState({pipes: pipes.concat(obj)});

        this.pipes.push(obj);
    }

    render() {
        var animationPlayState = this.props.animationPlayState;
        return <div>
            {
                this.state.pipes.map(function (pipe) {
                    return <Pipe ref={pipe.refName} key={pipe.refName}
                                 topHeight={pipe.topHeight}
                                 bottomHeight={pipe.bottomHeight}
                                 animationPlayState={animationPlayState}/>;
                })
            }
        </div>
    }
}

class FlyArea extends React.Component {
    componentDidMount() {
        this.flyAreaHeight = $(this.refs.flyArea).height();
    }

    getFlyAreaHeight() {
        return this.flyAreaHeight;
    }

    triggerReplayClick() {
        this.refs.scoreBoard.triggerReplayClick();
    }

    getCeilingTopHeight() {
        return this.refs.ceiling.getTopHeight();
    }

    handleScoreBoardClick() {
        this.props.onClick();
    }

    showSplash() {
        this.refs.splash.show();
    }

    hideSplash() {
        this.refs.splash.hide();
    }

    getPlayerBoundingClientRect() {
        return this.refs.player.getBoundingClientRect();
    }

    dropPlayerToFloor() {
        this.refs.player.dropToFloor(this.getFlyAreaHeight());
    }

    showScoreBoard(callback) {
        this.refs.scoreBoard.show(callback);
    }

    hideScoreBoard() {
        this.refs.scoreBoard.hide();
    }

    showMedal() {
        this.refs.scoreBoard.showMedal();
    }

    showReplay() {
        this.refs.scoreBoard.showReplay();
    }

    updatePipes(newPipeProp) {
        this.refs.pipes.updatePipes(newPipeProp);
    }

    slicePipes() {
        this.refs.pipes.slicePipes();
    }

    getPipesCount() {
        return this.refs.pipes.getPipesCount();
    }

    getNextPipeUpper() {
        return this.refs.pipes.getNextPipeUpper();
    }

    initialPipesCount() {
        return this.refs.pipes.initialPipesCount();
    }

    render() {
        return <div id="flyarea" ref="flyArea">
            <Ceiling ref="ceiling" animationPlayState={this.props.animationPlayState}/>
            <Player ref="player"
                    top={this.props.playerTop}
                    y={this.props.playerY}
                    rotation={this.props.playerRotation}
                    animationPlayState={this.props.animationPlayState}
                    WebkitAnimationPlayState={this.props.animationPlayState}/>
            <BigScore erase={this.props.bigScoreErase}
                      score={this.props.score}/>
            <Splash ref="splash"/>
            <ScoreBoard ref="scoreBoard"
                        display={this.props.scoreBoardDisplay}
                        y={this.props.scoreBoardY}
                        opacity={this.props.scoreBoardOpacity}
                        score={this.props.score}
                        highScore={this.props.highScore}
                        replayY={this.props.replayY}
                        replayOpacity={this.props.replayOpacity}
                        medal={this.props.medal}
                        medalScale={this.props.medalScale}
                        medalOpacity={this.props.medalOpacity}
                        onClick={this.handleScoreBoardClick.bind(this) }/>
            <Pipes ref="pipes" animationPlayState={this.props.animationPlayState}
                   flyAreaHeight={this.getFlyAreaHeight() }/>
        </div>
    }
}

class CookieUtils {
    static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
}
class GameScreen extends React.Component {
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

        //mobile browsers don't support buzz bindOnce event
        if (isIncompatible.any()) {
            //skip right to showing score
            this.showScore();
        }
        else {
            //play the hit sound (then the dead sound) and then show score
            this.sound.playSoundHit(function () {
                this.sound.playSoundDie(function () {
                    this.showScore();
                }.bind(this));
            }.bind(this));
        }
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

ReactDOM.render(<GameScreen/>, document.getElementById("gamecontainer"));

var isIncompatible = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Safari: function () {
        return (navigator.userAgent.match(/OS X.*Safari/) && !navigator.userAgent.match(/Chrome/));
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isIncompatible.Android() || isIncompatible.BlackBerry() || isIncompatible.iOS() || isIncompatible.Opera() || isIncompatible.Safari() || isIncompatible.Windows());
    }
};