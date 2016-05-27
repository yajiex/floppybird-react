/* eslint global-require: 0 */

import React from 'react';
import styles from './CurrentScore.css';

const CurrentScore = (props) => {
  const digits = props.score.toString().split('');
  return (<div className={styles.currentScore}>
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

CurrentScore.propTypes = {
  score: React.PropTypes.number,
};

export { CurrentScore as default };
