import React from 'react';
import styles from './BigScore.css';

const BigScore = (props) => {
  const digits = props.erase ? [] : props.score.toString().split('');
  return (<div className={styles.bigScore}>
    {
      digits.map((digit, index) => {
        return <img key={`digit${index}`}
                    src={require(`./assets/font_big_${digit}.png`)}
                    alt={digit} />;
      })
    }
  </div>);
};

export { BigScore as default };
