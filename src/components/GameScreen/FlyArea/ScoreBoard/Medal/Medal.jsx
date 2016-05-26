import React from 'react';
import $ from 'jquery';
import 'jquery.transit';

export default class Medal extends React.Component {
    show() {
        $(this.refs.medal).transition({opacity: 1, scale: 1}, 1200, 'ease');
    }

    render() {
        return <div id="medal" ref="medal" style={{ scale: this.props.scale, opacity: this.props.opacity }}>
            {this.props.medal === null ? "" :
                <img src={require("./assets/medal_" + this.props.medal + ".png")} alt={"'" + this.props.medal + "'"}/>}
        </div>
    }
}