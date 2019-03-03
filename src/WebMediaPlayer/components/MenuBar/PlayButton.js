import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

class PlayButton extends Component {

    handleClick = (e) => {
        this.props.dispatch({ type: 'USER_ACTIVE' });
        if (!this.props.isReadingTerminated){
            if(this.props.isPlaying){
                this.props.dispatch({ type: 'PAUSE' });
            } else {
                this.props.dispatch({ type: 'PLAY' });
            }
        } else {
            //this.props.dispatch({ type: 'READING_NOT_TERMINATED' });
            this.props.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: 0 } });
            //this.props.dispatch({ type: 'PLAY' });
        }
    }

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
            <div className="wmp-tool-button material-icons light-grey-to-white md-29" onClick={this.handleClick}>
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