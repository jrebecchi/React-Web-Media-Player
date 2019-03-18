import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';

class Button extends Component {

    handleClick = (e) => {
        this.props.dispatch({ type: 'USER_ACTIVE' });
        if(this.props.callback)
            this.props.callback(e);
    }

    render = () => {
        let img;
        if(this.props.href !== undefined){
            return ( 
                <div className="wmp-tool-button light-grey-to-white" style={this.props.style}>
                    <a href={this.props.href}><img src={this.props.img} alt=""/></a> 
                </div>
            )
        } else {
            return ( 
                <div className="wmp-tool-button light-grey-to-white" style={this.props.style} onClick={this.handleClick}>
                    <img src={this.props.img} alt=""/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Button);