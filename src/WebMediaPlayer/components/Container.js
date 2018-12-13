import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Container.css';
import TitleBar from "./TitleBar/TitleBar";
import MenuBar from "./MenuBar/MenuBar";
import Spinner from "./Loading/Spinner"
import Thumbnail from "./Init/Thumbnail"
import Video from "./Medias/Video";
import Audio from "./Medias/Audio";
import Slideshow from "./Medias/Slideshow";
import LargePlayButton from "./Init/LargePlayButton";
//cursor: auto
class Container extends Component {
    handleMouseEnter = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'HIGHLIGHT_PLAYER' });
    }

    handleMouseLeave = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'UNHIGHLIGHT_PLAYER' });
    }

    handleClick = (e) => {
        e.stopPropagation();
        if(!this.props.isInitialized)
            this.props.dispatch({ type: 'INITIALIZE_PLAYER' });
    }

    render = () => {
        const style = {
            width: this.props.width + "px",
            height: this.props.height + "px"
        }
        let thumbnail, video, audio, slideshow, largePlayButton;
        if (this.props.thumbnail && !this.props.isInitialized)
            thumbnail = <Thumbnail />;
        if(!this.props.isInitialized)
            largePlayButton = <LargePlayButton />;
        if (this.props.hasVideo) {
            video = <Video />;
        } else if (this.props.hasAudio) {
            audio = <Audio />;
            slideshow = <Slideshow />
        } else if (this.props.hasSlideshow) {
            slideshow = <Slideshow />
        }
        return (
            <div className="wmp-container" style={style} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleClick}>
                <Spinner />
                {thumbnail}
                {largePlayButton}
                <TitleBar />
                <MenuBar />
                {video}
                {audio}
                {slideshow}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        width: state.width,
        height: state.height,
        thumbnail: state.thumbnail,
        hasVideo: state.hasVideo,
        hasAudio: state.hasAudio,
        hasSlideshow: state.hasSlideshow,
        isInitialized: state.isInitialized
    };
};

export default connect(mapStateToProps)(Container);
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
                      <div class="salefi-player-tool-button button-time salefi-player-time-display"><span class="salefi-player-time">0:00</span><span class="salefi-player-time"> / </span><span class="salefi-player-time">9:56</span></div>
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
          <video width="560" height="315">
              <source src="https://nusid.net/video.mp4" />
          </video>
*/