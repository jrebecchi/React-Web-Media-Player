import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Button.css';
import './LogoButton.css'

class LogoButton extends Component {

    getAltValue = (imagesrc) => {
        return imagesrc.split('/')
            .map(part => part.split(".")[0])
            .reduce((accumulator, currentValue) => currentValue+' '+accumulator);
    };
    
    render = () => {
        let alt = this.getAltValue(this.props.logo);
        return (
            <div className="wmp-tool-button logo light-grey-to-white">
                <img src={this.props.logo} alt={alt} className="logo-image" /> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logo: state.logo,
        logoLink: state.logoLink
    };
};

export default connect(mapStateToProps)(LogoButton);