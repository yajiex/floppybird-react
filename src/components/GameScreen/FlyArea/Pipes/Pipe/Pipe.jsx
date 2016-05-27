import React from 'react';
import $ from 'jquery';
import styles from './Pipe.css';

export default class Pipe extends React.Component {
  getPositionLeft() {
    return $(this.refs.pipe).position().left;
  }

  getPipeUpper() {
    return $(this.refs.pipeUpper);
  }

  render() {
    return <div className={styles.pipe} ref="pipe"
                style={{ animationPlayState: this.props.animationPlayState, WebkitAnimationPlayState: this.props.animationPlayState }}>
      <div ref="pipeUpper" className={styles.pipeUpper} style={{ height: this.props.topHeight }}>
      </div>
      <div className={styles.pipeLower} style={{ height: this.props.bottomHeight }}>
      </div>
    </div>
  }
}