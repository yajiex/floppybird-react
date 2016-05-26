import React from 'react';
import $ from 'jquery';

export default class Ceiling extends React.Component {
    componentDidMount() {
        var ceiling = $(this.refs.ceiling);
        this.topHeight = ceiling.offset().top + ceiling.height();
    }

    getTopHeight() {
        return this.topHeight;
    }

    render() {
        return <div ref="ceiling" id="ceiling"
                    style={{animationPlayState: this.props.animationPlayState,WebkitAnimationPlayState: this.props.animationPlayState}}>

        </div>
    }
}