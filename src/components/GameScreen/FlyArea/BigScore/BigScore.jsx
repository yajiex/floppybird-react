import React from 'react';

const BigScore = (props) => {
    var digits = props.erase ? [] : props.score.toString().split('');
    return <div id="bigscore">
        {
            digits.map(function (digit, index) {
                return <img key={"digit" + index} src={require('./assets/font_big_' + digit + '.png')} alt={digit}/>;
            })
        }
    </div>
};

export {BigScore as default}