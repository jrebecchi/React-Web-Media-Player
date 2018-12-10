import React, { Component } from 'react';
import { connect } from 'react-redux';

class Thumbnail extends Component {

    render = () => {
        return (
            <div className="">
                Thumbnail
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
  
export default connect(mapStateToProps)(Thumbnail);