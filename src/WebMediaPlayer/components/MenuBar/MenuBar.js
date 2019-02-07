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

    render = () => {
        let volumeControl, previousButton, nextButton, logo, button1, button2;
        if (this.props.hasVideo || this.props.hasAudio)
            volumeControl = <VolumeControl />;
        else {
            previousButton = <PreviousButton />;
            nextButton = <NextButton />;
        }
        if (this.props.logo){
            logo = <LogoButton />
        }
        if (this.props.button1){
            button1 = <Button img={this.props.button1.img} href={this.props.button1.href} style={this.props.button1.style} callback={this.props.button1.callback}/>
            
        }
        if (this.props.button2){
            button2 = <Button img={this.props.button2.img} href={this.props.button2.href} style={this.props.button2.style} callback={this.props.button2.callback}/>
        }
        return (
            <div className="wmp-menu-bar-container">
                <div className="wmp-bottom-shading"></div>
                <div className="wmp-menu-bar-offset-left"></div>
                <div className="wmp-menu-bar-offset-right"></div>
                <div className="wmp-menu-bar">
                    <div className="wmp-tool-constainer">
                        <div className="wmp-tool-constainer-left">
                            <PlayButton />
                            {volumeControl}
                            {previousButton}
                            {nextButton}
                            <Timer />
                        </div>
                        <div className="wmp-tool-constainer-right">
                            {button1}
                            {button2 }
                            {logo}
                            <FullscreenButton />
                        </div>
                    </div>
                </div>
                <ProgressBar/>
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
        button1: state.button1,
        button2: state.button2,
    };
};

export default connect(mapStateToProps)(MenuBar);

/*

        <div class="salefi-player-menu-bar-container" hidden="">
              <div class="salefi-player-bottom-shading"></div>
              <div class="salefi-player-menu-bar-offset-left"></div>
              <div class="salefi-player-menu-bar-offset-right"></div>
              <div class="salefi-player-menu-bar">
                <div class="salefi-player-tool-constainer">
                    <div class="salefi-player-tool-constainer-left">
                      <div class="salefi-player-tool-button md-bottom-player material-icons light-grey-to-white md-29">pause</div>
                      <div class="salefi-player-tool-button md-bottom-player material-icons light-grey-to-white md-26">volume_up</div>
                      <div class="salefi-player-tool-button salefi-player-volume-slider">
                          <div class="salefi-player-volume-slider-total-bar">
                            <div class="salefi-player-volume-slider-level-bar"></div>
                            <div class="salefi-player-volume-slider-left-bar"></div>
                            <div class="salefi-player-volume-slider-scrubber-button"></div>
                          </div>
                      </div>
                    </div>
                    <div class="salefi-player-tool-constainer-right">
                      <div class="salefi-player-tool-button button-description light-grey-to-white">
                          <i class="material-icons  md-26">assignment</i>
                          <div class="description-caption">More info</div>
                      </div>
                      <div class="salefi-player-tool-button md-bottom-player material-icons light-grey-to-white md-26">add_shopping_cart</div>
                      <div class="salefi-player-tool-button button-salefi-logo light-grey-to-white">Salefi</div>
                      <div class="salefi-player-tool-button md-bottom-player material-icons light-grey-to-white md-29">fullscreen</div>
                    </div>
                </div>
              </div>
              <div class="salefi-player-progress-bar-wrapper">
                <div class="salefi-player-progress-bar"></div>
                <div class="salefi-player-progress-bar loaded"></div>
                <div class="salefi-player-progress-bar progression"></div>
                <div class="salefi-player-progress-bar desired"></div>
                <div class="salefi-player-scrubber-button hide"></div>
              </div>
          </div>
          */