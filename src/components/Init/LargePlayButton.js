import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LargePlayButton.css';

const playLogo =
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
        <path fill="white" d="M8 5v14l11-7z" />
        <path d="M0 0h24v24H0z" fill="none" />
    </svg>

class LargePlayButton extends Component {

    render = () => {
        let style;
        if(this.props.isPlayerHighlighted){
            style = {
                backgroundColor: this.props.color,
                opacity: 1
            }
        }
        
        return (
            <div className="wmp-large-play-button " style={style}>
                <div className="wmp-central-play-arrow material-icons md-40">{playLogo}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isPlayerHighlighted: state.isPlayerHighlighted,
        color: state.color
    };
};
  
export default connect(mapStateToProps)(LargePlayButton);