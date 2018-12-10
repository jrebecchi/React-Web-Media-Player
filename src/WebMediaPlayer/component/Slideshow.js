import React, { Component } from 'react';
import { connect } from 'react-redux';

class Slideshow extends Component {

    render = () => {
        return (
            <div className="">
                Slideshow
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
  
export default connect(mapStateToProps)(Slideshow);