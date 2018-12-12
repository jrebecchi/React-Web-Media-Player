import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Thumbnail.css';


class Thumbnail extends Component {

    render = () => {
        if(this.props.thumbnail !== undefined){
            let style = {
                backgroundImage: "url(" + this.props.thumbnail + ")"
            }
            return (
                <div className="wmp-thumbnail-overlay-image" style={style} hidden={this.props.isInitialized}></div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        thumbnail: state.thumbnail,
        isInitialized: state.isInitialized
    };
};

export default connect(mapStateToProps)(Thumbnail);