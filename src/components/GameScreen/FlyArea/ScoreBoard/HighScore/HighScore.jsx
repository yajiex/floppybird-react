import React from 'react';
import styles from './HighScore.css';

const HighScore = (props) => {
    var digits = props.highScore.toString().split('');
    return <div className={styles.highScore}>
        {
            digits.map(function (digit, index) {
                return <img key={"digit" + index} src={require('./assets/font_small_' + digit + '.png')} alt={digit}/>;
            })
        }
    </div>
};

export {HighScore as default}