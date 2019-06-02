import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Container.css';
import fscreen from "fscreen";
import TitleBar from "./TitleBar/TitleBar";
import MenuBar from "./MenuBar/MenuBar";
import Spinner from "./Loading/Spinner"
import Thumbnail from "./Init/Thumbnail"
import Mixer from "./Medias/Mixer";
import LargePlayButton from "./Init/LargePlayButton";

const TIME_TO_HIDE_MENU_IN_MILLISECONDS = 3000;

class Container extends Component {
    constructor(props) {
        super(props);
        this.fscreen = fscreen;
    }

    componentDidMount = () => {
        fscreen.addEventListener("fullscreenchange", this.detectFullScreen.bind(this));
    }

    componentWillUnmount = () => {
        fscreen.removeEventListener("fullscreenchange", this.detectFullScreen.bind(this));
        if (this.mouseStopTimer) {
            window.clearTimeout(this.mouseStopTimer);
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.isFullscreen !== this.props.isFullscreen) {
            this.handlePropsChanges(this.props);
        }

        if (prevProps.timeLastUserAction !== this.props.timeLastUserAction && this.node !== undefined) {
            this.waitUserToBeInactive();
        }
    }

    handlePropsChanges = (props) => {
        const enabled = fscreen.fullscreenElement;
        if (enabled && !props.isFullscreen) {
            this.leaveFullScreen();
        } else if (!enabled && props.isFullscreen) {
            this.enterFullScreen();
        }
    }

    detectFullScreen = () => {
        if (this.fscreen.fullscreenElement == null) {
            if (this.props.isFullscreen) {
                this.props.dispatch({ type: 'SWITCH_FULLSCREEN_STATE' });
            }
            this.props.dispatch({ type: 'FULL_SCREEN_DISABLED' });
        } else {
            this.props.dispatch({ type: 'FULL_SCREEN_ENABLED' });
        }
    }

    enterFullScreen = () => {
        if (fscreen.fullscreenEnabled) {
            fscreen.requestFullscreen(this.node);
        }
    }

    leaveFullScreen = () => {
        if (fscreen.fullscreenEnabled) {
            fscreen.exitFullscreen();
        }
    }

    handleMouseEnter = (e) => {
        e.stopPropagation();
        if (!this.props.isInitialized) {
            this.props.dispatch({ type: 'HIGHLIGHT_PLAYER' });
        } else if (this.props.isPlaying) {
            //this.props.dispatch({ type: 'SHOW_MENUS' });
        }
    }

    handleMouseLeave = (e) => {
        e.stopPropagation();
        if (!this.props.isInitialized) {
            this.props.dispatch({ type: 'UNHIGHLIGHT_PLAYER' });
        } else if (this.props.allowMenuHiding && this.props.isPlaying) {
            this.props.dispatch({ type: 'HIDE_MENUS' });
        }
    }

    handleMouseMove = (e) => {
        if (this.props.isInitialized) {
            this.props.dispatch({ type: 'USER_ACTIVE' });
        }
    }

    handleClick = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'USER_ACTIVE' });
        if (!this.props.isInitialized) {
            this.props.dispatch({ type: 'INITIALIZE_PLAYER' });
            this.props.dispatch({ type: 'PLAY' });
        } else {
            if (this.props.isPlaying) {
                this.props.dispatch({ type: 'PREVENT_MENU_HIDING' });
                this.props.dispatch({ type: 'PAUSE' });
            } else {
                this.props.dispatch({ type: 'PLAY' });
                this.props.dispatch({ type: 'ALLOW_MENU_HIDING' });
            }
        }
    }

    waitUserToBeInactive = () => {
        this.props.dispatch({ type: 'SHOW_MENUS' });
        this.node.style.cursor = "";
        if (this.mouseStopTimer) {
            window.clearTimeout(this.mouseStopTimer);
        }
        this.mouseStopTimer = window.setTimeout(() => {
            if (this.props.allowMenuHiding && this.props.isPlaying) {
                this.props.dispatch({ type: 'HIDE_MENUS' });
                this.node.style.cursor = "none";
            }
        }, TIME_TO_HIDE_MENU_IN_MILLISECONDS);
    }

    render = () => {
        const className = ["wmp-container", "fullscreen"];
        const style = {};
        const id = this.props.id;
        Object.assign(style, this.props.style);
        
        style.width = this.props.width + "px",
        style.height = this.props.height + "px"
        if (this.props.isFullscreenActivated) {
            className.push("fullscreen-enabled");
            style.width = "100%";
            style.height = "100%";
        }

        let thumbnail, largePlayButton, menuBar, titleBar, spinner;
        if (this.props.thumbnail && !this.props.isInitialized && !this.props.autoplay)
            thumbnail = <Thumbnail />;
        if (this.props.isInitialized && this.props.showMenus || this.props.isTestEnvironment) {
            menuBar = <MenuBar />
        }
        if (!this.props.isInitialized && !this.props.autoplay) {
            largePlayButton = <LargePlayButton />;
        }
        if (!this.props.isInitialized || this.props.showMenus) {
            titleBar = <TitleBar />
        }
        if (this.props.isInitialized && this.props.isLoading) {
            spinner = <Spinner />
        }
        return (
            <div
                id={id}
                className={className.join(" ")} 
                style={style} ref={node => (this.node = node)} 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave} 
                onMouseMoveCapture={this.handleMouseMove} 
                onClick={this.handleClick}
            >
                {spinner}
                {thumbnail}
                {largePlayButton}
                {titleBar}
                {menuBar}
                <Mixer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        timeLastUserAction: state.timeLastUserAction,
        width: state.width,
        height: state.height,
        thumbnail: state.thumbnail,
        hasVideo: state.hasVideo,
        hasAudio: state.hasAudio,
        hasSlideshow: state.hasSlideshow,
        isInitialized: state.isInitialized,
        isFullscreen: state.isFullscreen,
        showMenus: state.showMenus,
        isPlaying: state.isPlaying,
        allowMenuHiding: state.allowMenuHiding,
        isLoading: state.isLoading,
        isFullscreenActivated: state.isFullscreenActivated,
        autoplay: state.autoplay,
        style: state.style,
        id: state.id,
        isTestEnvironment: state.isTestEnvironment,
    };
};

export default connect(mapStateToProps)(Container);