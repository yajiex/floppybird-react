import React from 'react';
import $ from 'jquery';
import 'jquery.transit';

export default class Player extends React.Component {
    getBoundingClientRect() {
        return this.refs.player.getBoundingClientRect();
    }

    dropToFloor(flyAreaHeight) {
        var playerBottom = $(this.refs.player).position().top + $(this.refs.player).width();
        var moveY = Math.max(0, flyAreaHeight - playerBottom);
        $(this.refs.player).transition({y: moveY, rotate: 90}, 1000, 'easeInOutCubit');
    }

    render() {
        return <div ref="player" id="player" className="bird" style={{
            y: this.props.y,
            top: this.props.top,
            transform: 'translate(0px, 0px) rotate(' + this.props.rotation + 'deg)',
            animationPlayState: this.props.animationPlayState,
            WebkitAnimationPlayState: this.props.animationPlayState
        }}>
        </div>
    }
}