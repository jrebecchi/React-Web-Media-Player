import React, { Component, CSSProperties, MouseEvent } from 'react';
import { connect } from 'react-redux';
import './Container.css';
import fscreen from "fscreen";
import TitleBar from "./TitleBar/TitleBar";
import MenuBar from "./MenuBar/MenuBar";
import Spinner from "./Loading/Spinner"
import Thumbnail from "./Init/Thumbnail"
import Mixer from "./Medias/Mixer";
import LargePlayButton from "./Init/LargePlayButton";
import { IState } from '../state/types/IState';
import { Dispatch } from 'redux';
import { IAction } from '../state/types/IAction';
import { highLightPlayer } from '../state/actions/HighlightPlayer';
import { unhighlightPlayer } from '../state/actions/UnhighlightPlayer';
import { hideMenus } from '../state/actions/HideMenus';
import { adaptPlayerToFullscreen } from '../state/actions/AdaptPlayerToFullscreen';
import { adaptPlayerToNonFullscreen } from '../state/actions/AdaptPlayerToNonFullscreen';

const TIME_TO_HIDE_MENU_IN_MILLISECONDS = 3000;

interface ContainerProps {
    timeLastUserAction: Date;
    width: number;
    height: number;
    thumbnail: string | undefined;
    hasVideo: boolean;
    hasAudio: boolean;
    hasSlideshow: boolean;
    isInitialized: boolean;
    isFullscreen: boolean;
    showMenus: boolean;
    isPlaying: boolean;
    allowMenuHiding: boolean;
    isLoading: boolean;
    isFullscreenActivated: boolean;
    autoplay: boolean;
    style: Record<string, string>;
    id: string | undefined;
    isTestEnvironment: boolean;
    dispatch: Dispatch<IAction>;
}

class Container extends Component<ContainerProps> {
    private node: HTMLDivElement | null;
    private mouseStopTimer: number;

    constructor(props: ContainerProps) {
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

    componentDidUpdate = (prevProps: ContainerProps) => {
        if (prevProps.isFullscreen !== this.props.isFullscreen) {
            this.handlePropsChanges(this.props);
        }

        if (prevProps.timeLastUserAction !== this.props.timeLastUserAction && this.node !== undefined) {
            this.waitUserToBeInactive();
        }
    }

    handlePropsChanges = (props: ContainerProps) => {
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
            this.props.dispatch(adaptPlayerToNonFullscreen());
        } else {
            this.props.dispatch(adaptPlayerToFullscreen());
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

    handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!this.props.isInitialized) {
            this.props.dispatch(highLightPlayer());
        } else if (this.props.isPlaying) {
            //this.props.dispatch({ type: 'SHOW_MENUS' });
        }
    }

    handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!this.props.isInitialized) {
            this.props.dispatch(unhighlightPlayer());
        } else if (this.props.allowMenuHiding && this.props.isPlaying) {
            this.props.dispatch(hideMenus());
        }
    }

    handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (this.props.isInitialized) {
            this.props.dispatch({ type: 'USER_ACTIVE' });
        }
    }

    handleClick = (e: MouseEvent<HTMLDivElement>) => {
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
        if (this.node === null) return;
        this.node.style.cursor = "";
        if (this.mouseStopTimer) {
            window.clearTimeout(this.mouseStopTimer);
        }
        this.mouseStopTimer = window.setTimeout(() => {
            if (this.props.allowMenuHiding && this.props.isPlaying && this.node) {
                this.props.dispatch(hideMenus());
                this.node.style.cursor = "none";
            }
        }, TIME_TO_HIDE_MENU_IN_MILLISECONDS);
    }

    render = () => {
        const className = ["wmp-container", "fullscreen"];
        const style: CSSProperties = {};
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

const mapStateToProps = (state: IState) => ({
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
});

export default connect(mapStateToProps)(Container);