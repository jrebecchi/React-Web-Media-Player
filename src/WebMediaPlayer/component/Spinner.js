import React, { Component } from 'react';
import { connect } from 'react-redux';

class Spinner extends Component {

    render = () => {
        return (
            <div className="">
                Spinner
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
  
export default connect(mapStateToProps)(Spinner);