import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Thumbnail.css';

class TitleBar extends Component {

    render = () => {
        let title
        if (this.props.link) {
            title =<a href={this.props.link} target="_blank" rel="noopener noreferrer">{this.props.title}</a>
        } else {
            title =this.props.title;

        }
        return (
            <div className="wmp-title-container">
                <div className="wmp-title light-grey-to-white">
                    {title}
                </div>
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