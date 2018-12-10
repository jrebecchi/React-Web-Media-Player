import React, { Component } from 'react';
import { connect } from 'react-redux';

class TitleBar extends Component {

    render = () => {
        return (
            <div className="">
                TitleBar
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
  
export default connect(mapStateToProps)(TitleBar);