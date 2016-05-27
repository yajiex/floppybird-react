import React from 'react';

import $ from 'jquery';

import Ceiling from './Ceiling/Ceiling.jsx';
import Player from './Player/Player.jsx';
import BigScore from './BigScore/BigScore.jsx';
import Splash from './Splash/Splash.jsx';
import ScoreBoard from './ScoreBoard/ScoreBoard.jsx';
import Pipes from './Pipes/Pipes.jsx';
import styles from './FlyArea.css';

export default class FlyArea extends React.Component {
  constructor() {
    super();
    this.handleScoreBoardClick = this.handleScoreBoardClick.bind(this);
  }

  componentDidMount() {
    this.flyAreaHeight = $(this.refs.flyArea).height();
  }

  getFlyAreaHeight() {
    return this.flyAreaHeight;
  }

  getCeilingTopHeight() {
    return this.refs.ceiling.getTopHeight();
  }

  getPlayerBoundingClientRect() {
    return this.refs.player.getBoundingClientRect();
  }

  getPipesCount() {
    return this.refs.pipes.getPipesCount();
  }

  getNextPipeUpper() {
    return this.refs.pipes.getNextPipeUpper();
  }

  triggerReplayClick() {
    this.refs.scoreBoard.triggerReplayClick();
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

  initialPipesCount() {
    return this.refs.pipes.initialPipesCount();
  }

  render() {
    return (<div className={styles.flyArea} ref="flyArea">
      <Ceiling
        ref="ceiling"
        animationPlayState={this.props.animationPlayState}
      />
      <Player
        ref="player"
        top={this.props.playerTop}
        y={this.props.playerY}
        rotation={this.props.playerRotation}
        animationPlayState={this.props.animationPlayState}
        WebkitAnimationPlayState={this.props.animationPlayState}
      />
      <BigScore
        erase={this.props.bigScoreErase}
        score={this.props.score}
      />
      <Splash
        ref="splash"
      />
      <ScoreBoard
        ref="scoreBoard"
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
        onClick={this.handleScoreBoardClick}
      />
      <Pipes
        ref="pipes"
        animationPlayState={this.props.animationPlayState}
        flyAreaHeight={this.getFlyAreaHeight()}
      />
    </div>);
  }
}

FlyArea.propTypes = {
  onClick: React.PropTypes.func,
  animationPlayState: React.PropTypes.string,
  playerTop: React.PropTypes.number,
  playerY: React.PropTypes.number,
  playerRotation: React.PropTypes.number,
  bigScoreErase: React.PropTypes.bool,
  score: React.PropTypes.number,
  scoreBoardDisplay: React.PropTypes.string,
  scoreBoardY: React.PropTypes.number,
  scoreBoardOpacity: React.PropTypes.number,
  highScore: React.PropTypes.number,
  replayY: React.PropTypes.number,
  replayOpacity: React.PropTypes.number,
  medal: React.PropTypes.string,
  medalScale: React.PropTypes.number,
  medalOpacity: React.PropTypes.number,
};
