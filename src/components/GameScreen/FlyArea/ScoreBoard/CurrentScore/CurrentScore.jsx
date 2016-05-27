import React from 'react';
import styles from './CurrentScore.css';

const CurrentScore = (props) => {
    var digits = props.score.toString().split('');
    return <div className={styles.currentScore}>
        {
            digits.map(function (digit, index) {
                return <img key={"digit" + index} src={require('./assets/font_small_' + digit + '.png')} alt={digit}/>;
            })
        }
    </div>
};

export {CurrentScore as default}