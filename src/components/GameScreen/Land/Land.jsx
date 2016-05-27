import React from 'react';
import $ from 'jquery';
import styles from './Land.css';

export default class Land extends React.Component {
  componentDidMount() {
    this.offsetTop = $(this.refs.land).offset().top;
  }

  getOffsetTop() {
    return this.offsetTop;
  }

  render() {
    return (<div
      ref="land"
      className={styles.land}
      style={{ animationPlayState: this.props.animationPlayState,
      WebkitAnimationPlayState: this.props.animationPlayState }}
    >
    </div>);
  }
}

Land.propTypes = { animationPlayState: React.PropTypes.string };
