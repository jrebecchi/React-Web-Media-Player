import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../state/types/IState';
import './TitleBar.css';

interface TitleBarProps {
    title?: string;
    link?: string;
}

class TitleBar extends Component<TitleBarProps> {
    handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }

    render = () => {
        let title
        if (this.props.link) {
            title = <a className="wmp-title light-grey-to-white" href={this.props.link} target="_blank" rel="noopener noreferrer">{this.props.title}</a>
        } else {
            title = <span className="wmp-title light-grey-to-white">{this.props.title}</span>;

        }
        return (
            <div className="wmp-title-container" onClick={this.handleClick}>
                {title}
                <div className="wmp-top-shading"></div>
            </div>

        );
    }
}

const mapStateToProps = (state: IState): TitleBarProps => {
    return {
        title: state.title,
        link: state.link,
    };
};

export default connect<TitleBarProps>(mapStateToProps)(TitleBar);