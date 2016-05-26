import React from 'react';
import $ from 'jquery';

export default class Pipe extends React.Component {
    getPositionLeft() {
        return $(this.refs.pipe).position().left;
    }

    getPipeUpper() {
        return $(this.refs.pipeUpper);
    }

    render() {
        return <div className="pipe" ref="pipe"
                    style={{ animationPlayState: this.props.animationPlayState, WebkitAnimationPlayState: this.props.animationPlayState }}>
            <div ref="pipeUpper" className="pipe_upper" style={{ height: this.props.topHeight }}>
            </div>
            <div className="pipe_lower" style={{ height: this.props.bottomHeight }}>
            </div>
        </div>
    }
}