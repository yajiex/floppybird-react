import React from 'react';

import $ from 'jquery';
import 'jquery.transit';

import CurrentScore from './CurrentScore/CurrentScore.jsx';
import HighScore from './HighScore/HighScore.jsx';
import Medal from './Medal/Medal.jsx';
import Replay from './Replay/Replay.jsx';
import styles from './ScoreBoard.css';

export default class ScoreBoard extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  triggerReplayClick() {
    this.refs.replay.triggerClick();
  }

  handleClick() {
    this.hide(() => {
      this.setState({ display: 'none' });
      this.props.onClick();
    });
  }

  show(callback) {
    $(this.refs.scoreBoard).transition({ y: '0px', opacity: 1 }, 600, 'ease', callback);
  }

  hide(callback) {
    $(this.refs.scoreBoard).transition({ y: '-40px', opacity: 0 }, 1000, 'ease', callback);
  }

  showMedal() {
    this.refs.medal.show();
  }

  showReplay() {
    this.refs.replay.show();
  }

  render() {
    return (<div
      className={styles.scoreBoard}
      ref="scoreBoard"
      style={{ display: this.props.display, y: this.props.y, opacity: this.props.opacity }}
    >
      <Medal
        ref="medal"
        medal={this.props.medal}
        scale={this.props.medalScale}
        opacity={this.props.medalOpacity}
      />
      <CurrentScore
        score={this.props.score}
      />
      <HighScore
        highScore={this.props.highScore}
      />
      <Replay
        ref="replay"
        y={this.props.replayY}
        opacity={this.props.replayOpacity}
        onClick={this.handleClick}
      />
    </div>);
  }
}

ScoreBoard.propTypes = {
  onClick: React.PropTypes.func,
  display: React.PropTypes.string,
  y: React.PropTypes.number,
  opacity: React.PropTypes.number,
  medal: React.PropTypes.string,
  medalScale: React.PropTypes.number,
  medalOpacity: React.PropTypes.number,
  score: React.PropTypes.number,
  highScore: React.PropTypes.number,
  replayY: React.PropTypes.number,
  replayOpacity: React.PropTypes.number,
};
