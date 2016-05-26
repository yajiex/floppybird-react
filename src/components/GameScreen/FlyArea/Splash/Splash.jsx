import React from 'react';

import $ from 'jquery';
import 'jquery.transit';

export default class Splash extends React.Component {
    show() {
        $(this.refs.splash).transition({opacity: 1}, 2000, 'ease');
    }

    hide() {
        $(this.refs.splash).stop();
        $(this.refs.splash).transition({opacity: 0}, 500, 'erase');
    }

    render() {
        return <div id="splash" ref="splash"></div>
    }
}