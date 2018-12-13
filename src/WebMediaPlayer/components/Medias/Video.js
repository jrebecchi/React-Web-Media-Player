import React, { Component } from 'react';
import { connect } from 'react-redux';

class Video extends Component {

    render = () => {
        return (
            <div className="">
                Video
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
  
export default connect(mapStateToProps)(Video);