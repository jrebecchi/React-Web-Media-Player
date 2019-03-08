import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

const fullscreenLogo =
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path class="wmp-tool-button-logo" fill="#e4e5e8" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>

const fullscreenExitLogo =
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path class="wmp-tool-button-logo" fill="#e4e5e8" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
    </svg>

class FullscreenButton extends Component {

    handleClick = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'SWITCH_FULLSCREEN_STATE' });
        this.props.dispatch({ type: 'USER_ACTIVE' });
    }

    render = () => {
        let button;
        if (this.props.isFullscreen)
            button = fullscreenExitLogo;
        else
            button = fullscreenLogo;

        return (
            <div className="wmp-tool-button logo-padding-small" onClick={this.handleClick}>
                {button}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFullscreen: state.isFullscreen
    };
};

export default connect(mapStateToProps)(FullscreenButton);