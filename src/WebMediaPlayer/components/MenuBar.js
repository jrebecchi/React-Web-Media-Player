import React, { Component } from 'react';
import { connect } from 'react-redux';

class MenuBar extends Component {

    render = () => {
        return (
            <div className="">
                MenuBar
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
  
export default connect(mapStateToProps)(MenuBar);