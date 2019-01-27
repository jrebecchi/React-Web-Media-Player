import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

class FullscreenButton extends Component {

    handleClick = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'SWITCH_FULLSCREEN_STATE' });
        this.props.dispatch({ type: 'USER_ACTIVE' });     
    }
    
    render = () => {
        let button;
        if (this.props.isFullscreen)
            button = "fullscreen_exit";
        else
            button = "fullscreen";

        return (
            <div className="wmp-tool-button material-icons light-grey-to-white md-29" onClick={this.handleClick}>
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