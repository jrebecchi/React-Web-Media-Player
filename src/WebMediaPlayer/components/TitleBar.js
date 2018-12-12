import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TitleBar.css';

class TitleBar extends Component {

    render = () => {
        let title
        if (this.props.link) {
            title = <a className="wmp-title light-grey-to-white" href={this.props.link} target="_blank" rel="noopener noreferrer">{this.props.title}</a>
        } else {
            title = <span className="wmp-title light-grey-to-white">{this.props.title}</span>;

        }
        /*
        <div class="salefi-player-title-container">
            <a class="salefi-player-title light-grey-to-white" href="#" target="_blank">Product name - Store name</a>
            <div class="salefi-player-top-shading"></div>
            </div>
        */
        return (
            <div className="wmp-title-container">
                {title}
                <div className="wmp-top-shading"></div>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.title,
        link: state.link
    };
};

export default connect(mapStateToProps)(TitleBar);