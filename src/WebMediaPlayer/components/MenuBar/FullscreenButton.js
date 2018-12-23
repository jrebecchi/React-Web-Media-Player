import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

class FullscreenButton extends Component {
    render = () => {
        let button;
        if (this.props.isFullScreenActivated)
            button = "fullscreen_exit";
        else
            button = "fullscreen";

        return (
            <div class="wmp-tool-button material-icons light-grey-to-white md-29">
                fullscreen
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFullScreen: state.isFullScreenActivated
    };
};

export default connect(mapStateToProps)(FullscreenButton);