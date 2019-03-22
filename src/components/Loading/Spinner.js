import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Spinner.css';

class Spinner extends Component {

    render = () => {
        return( 
            <div className="wmp-spinner" hidden={!this.props.isLoading}>
                <div className="wmp-spinner-container">
                    <div className="wmp-spinner-rotator">
                        <div className="wmp-spinner-left">
                            <div className="wmp-spinner-circle"></div>
                        </div>
                        <div className="wmp-spinner-right">
                            <div className="wmp-spinner-circle"></div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.isLoading
    };
};

export default connect(mapStateToProps)(Spinner);