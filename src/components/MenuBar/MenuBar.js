import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MenuBar.css';
import PlayButton from './PlayButton';
import NextButton from './NextButton';
import PreviousButton from './PreviousButton';
import Timer from './Timer';
import FullscreenButton from './FullscreenButton';
import VolumeControl from './VolumeControl';
import ProgressBar from "./ProgressBar";
import LogoButton from "./LogoButton";
import Button from "./Button";

class MenuBar extends Component {

    handleClick = (e) => {
        e.stopPropagation();
    }

    render = () => {
        let volumeControl, previousButton, nextButton, logo, fullscreenButton;
        let buttons = [];
        if (this.props.hasVideo || this.props.hasAudio)
            volumeControl = <VolumeControl />;
        else {
            previousButton = <PreviousButton />;
            nextButton = <NextButton />;
        }
        if (this.props.logo){
            logo = <LogoButton img={this.props.logo.img} href={this.props.logo.href}/>
        }
        if (this.props.buttons) {
            for (let i = 0; i < this.props.buttons.length; ++i) {
                buttons.push(<Button img={this.props.buttons[i].img} key={i} href={this.props.buttons[i].href} style={this.props.buttons[i].style} callback={this.props.buttons[i].callback} />)
            }
        }
        if (this.props.allowFullFrame) {
            fullscreenButton = <FullscreenButton />;
        }
        return (
            <div className="wmp-menu-bar-container">
                <div className="wmp-bottom-shading"></div>
                <div className="wmp-menu-bar-offset-left"></div>
                <div className="wmp-menu-bar-offset-right"></div>
                <div className="wmp-menu-bar" onClick={this.handleClick}>
                    <div className="wmp-tool-constainer">
                        <div className="wmp-tool-constainer-left">
                            <PlayButton />
                            {volumeControl}
                            {previousButton}
                            {nextButton}
                            <Timer />
                        </div>
                        <div className="wmp-tool-constainer-right">
                            {buttons}
                            {logo}
                            {fullscreenButton}
                        </div>
                    </div>
                </div>
                <ProgressBar />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hasVideo: state.hasVideo,
        hasAudio: state.hasAudio,
        hasSlideshow: state.hasSlideshow,
        allowMouseLeaveVolumeSlider: state.allowMouseLeaveVolumeSlider,
        logo: state.logo,
        buttons: state.buttons,
        allowFullFrame: state.allowFullFrame,
    };
};

export default connect(mapStateToProps)(MenuBar);
