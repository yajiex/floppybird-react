import React from 'react';
import $ from 'jquery';

export default class Land extends React.Component {
    componentDidMount() {
        this.offsetTop = $(this.refs.land).offset().top;
    }

    getOffsetTop() {
        return this.offsetTop;
    }

    render() {
        return <div ref="land" id="land"
                    style={{ animationPlayState: this.props.animationPlayState, WebkitAnimationPlayState: this.props.animationPlayState }}>
            <div id="debug"></div>
        </div>
    }
}