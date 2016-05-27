/* eslint global-require: 0 */

import React from 'react';
import $ from 'jquery';
import 'jquery.transit';
import styles from './Replay.css';

export default class Replay extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  triggerClick() {
    $(this.refs.replay).click();
  }

  handleClick() {
    if (this.replayclickable) {
      this.replayclickable = false;
      this.props.onClick();
    }
  }

  show() {
    $(this.refs.replay).transition({ y: '0px', opacity: 1 }, 600, 'ease');
    this.replayclickable = true;
  }

  render() {
    return (<div
      className={styles.replay}
      ref="replay"
      style={{ y: this.props.y, opacity: this.props.opacity }}
      onClick={this.handleClick}
    >
      <img
        src={require('./assets/replay.png')}
        alt="replay"
      />
    </div>);
  }
}

Replay.propTypes = {
  onClick: React.PropTypes.func,
  y: React.PropTypes.number,
  opacity: React.PropTypes.number,
};
