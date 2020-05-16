import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';
import './Timer.css'

class Timer extends Component {

    intToStingTime = (nbSeconds) => {
        let hours = (nbSeconds - nbSeconds % 3600) / 3600;
        let minuts = ((nbSeconds % 3600) - (nbSeconds % 3600) % 60) / 60;
        let seconds = Math.floor((nbSeconds % 3600) % 60);
        if (seconds < 10)
            seconds = "0" + seconds;
        if (minuts < 10 && (hours >= 1 || this.props.duration >= 600))
            minuts = "0" + minuts;

        if (hours >= 1 || this.props.duration >= 3600)
            return hours + ":" + minuts + ":" + seconds;
        else
            return minuts + ":" + seconds;
    };

    render = () => {
        return (
            <div className="wmp-tool-button button-time wmp-time-display">
                <div className="wmp-time-positionning">
                    <span className="wmp-time">{this.intToStingTime(this.props.currentTime)}</span>
                    <span className="wmp-time"> / </span>
                    <span className="wmp-time">{this.intToStingTime(this.props.duration)}</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        duration: state.duration,
        currentTime: state.currentTime
    };
};

export default connect(mapStateToProps)(Timer);