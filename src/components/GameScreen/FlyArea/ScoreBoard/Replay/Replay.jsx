import React from 'react';
import $ from 'jquery';
import 'jquery.transit';
import styles from './Replay.css';

export default class Replay extends React.Component {
    constructor(props) {
        super(props);
    }

    triggerClick() {
        $(this.refs.replay).click();
    }

    handleClick() {
        if (!this.replayclickable) {
            return;
        } else {
            this.replayclickable = false;
        }

        this.props.onClick();
    }

    show() {
        $(this.refs.replay).transition({y: "0px", opacity: 1}, 600, 'ease');
        this.replayclickable = true;
    }

    render() {
        return <div className={styles.replay} ref="replay" style={{ y: this.props.y, opacity: this.props.opacity }}
                    onClick={this.handleClick.bind(this) }>
            <img src={require("./assets/replay.png")} alt="replay"/>
        </div>
    }
}