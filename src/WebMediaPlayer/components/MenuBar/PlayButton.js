import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

const playLogo =
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
        <path className="wmp-tool-button-logo" fill="#e4e5e8" d="M8 5v14l11-7z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>

const pauseLogo =
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24">
        <path className="wmp-tool-button-logo" fill="#e4e5e8" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>

const replayLogo =
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path className="wmp-tool-button-logo" fill="#e4e5e8" d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>

class PlayButton extends Component {

    handleClick = (e) => {
        this.props.dispatch({ type: 'USER_ACTIVE' });
        if (!this.props.isReadingTerminated) {
            if (this.props.isPlaying) {
                this.props.dispatch({ type: 'PREVENT_MENU_HIDING' });
                this.props.dispatch({ type: 'PAUSE' });
            } else {
                this.props.dispatch({ type: 'PLAY' });
                this.props.dispatch({ type: 'ALLOW_MENU_HIDING' });
            }
        } else {
            this.props.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 0 } });
        }
    }

    render = () => {
        let action;
        if (!this.props.isReadingTerminated) {
            if (this.props.isPlaying) {
                action = pauseLogo;
            } else {
                action = playLogo;
            }
        } else {
            action = replayLogo;
        }
        return (
            <div className="wmp-tool-button logo-padding-small" onClick={this.handleClick}>
                {action}
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isPlaying: state.isPlaying,
        isReadingTerminated: state.isReadingTerminated
    };
};

export default connect(mapStateToProps)(PlayButton);