import React from 'react';

const HighScore = (props) => {
    var digits = props.highScore.toString().split('');
    return <div id="highscore">
        {
            digits.map(function (digit, index) {
                return <img key={"digit" + index} src={require('./assets/font_small_' + digit + '.png')} alt={digit}/>;
            })
        }
    </div>
};

export {HighScore as default}