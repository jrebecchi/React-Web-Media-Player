import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LargePlayButton.css';


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
                <div className="wmp-central-play-arrow material-icons md-40">play_arrow</div>
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