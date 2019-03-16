import React, { Component } from 'react';
import './Button.css';
import './LogoButton.css'

class LogoButton extends Component {

    getAltValue = (imagesrc) => {
        return imagesrc.split('/')
            .map(part => part.split(".")[0])
            .reduce((accumulator, currentValue) => currentValue+' '+accumulator);
    };
    
    render = () => {
        let logo;
        if(this.props.href !== undefined){
            logo = <a href={this.props.href}><img src={this.props.img} alt="" className="logo-image" /></a> 
        } else {
            logo = <img src={this.props.img} alt="" className="logo-image" />
        }
        return (
            <div className="wmp-tool-button logo light-grey-to-white">
                {logo}
            </div>
        );
    }
}

export default LogoButton;