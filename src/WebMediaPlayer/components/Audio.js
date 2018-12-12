import React, { Component } from 'react';
import { connect } from 'react-redux';

class Audio extends Component {

    render = () => {
        return (
            <div className="">
                Audio
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
  
export default connect(mapStateToProps)(Audio);