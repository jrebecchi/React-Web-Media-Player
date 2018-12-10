import React, { Component } from 'react';
import { connect } from 'react-redux';

class Slideshow extends Component {

    render = () => {
        return (
            <div class="salefi-player-animate-loader">
                <svg class="salefi-player-animate-loader-circular" viewBox="25 25 50 50">
                    <circle class="salefi-player-animate-loader-path" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
                </svg>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Slideshow);