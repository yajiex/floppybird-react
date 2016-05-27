/* eslint global-require: 0 */

import React from 'react';
import styles from './BigScore.css';

const BigScore = (props) => {
  const digits = props.erase ? [] : props.score.toString().split('');
  return (<div className={styles.bigScore}>
    {
      digits.map((digit, index) => (
        <img
          key={`digit${index}`}
          src={require(`./assets/font_big_${digit}.png`)}
          alt={digit}
        />)
      )
    }
  </div>);
};

BigScore.propTypes = {
  erase: React.PropTypes.bool,
  score: React.PropTypes.number,
};

export { BigScore as default };
