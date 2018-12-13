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
        let thumbnail, video, audio, slideshow, largePlayButton, menuBar;
        if (this.props.thumbnail && this.props.isInitialized)
            thumbnail = <Thumbnail />;
        if(this.props.isInitialized){
            menuBar = <MenuBar />
        } else {
            largePlayButton = <LargePlayButton />;
        }   
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
                {menuBar}
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
          <video width="560" height="315">
              <source src="https://nusid.net/video.mp4" />
          </video>
*/