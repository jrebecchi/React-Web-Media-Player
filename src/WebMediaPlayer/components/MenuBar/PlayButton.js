import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

class PlayButton extends Component {

    render = () => {
        let action;
        if (!this.props.isReadingTerminated){
            if(this.props.isPlaying){
                action = "pause";
            } else {
                action = "play_arrow";
            }
        } else {
            action = "replay"
        }
        return (
            <div className="wmp-tool-button material-icons light-grey-to-white md-29">
                {action}
            </div>    
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