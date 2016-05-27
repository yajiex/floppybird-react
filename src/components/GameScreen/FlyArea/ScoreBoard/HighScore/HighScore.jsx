/* eslint global-require: 0 */

import React from 'react';
import styles from './HighScore.css';

const HighScore = (props) => {
  const digits = props.highScore.toString().split('');
  return (<div className={styles.highScore}>
    {
      digits.map((digit, index) =>
        <img
          key={`digit${index}`}
          src={require(`./assets/font_small_${digit}.png`)}
          alt={digit}
        />
      )
    }
  </div>);
};

HighScore.propTypes = {
  highScore: React.PropTypes.number,
};

export { HighScore as default };
