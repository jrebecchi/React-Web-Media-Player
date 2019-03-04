import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProgressBar.css';
import { isInsideElement } from '../../services/Utils';


class ProgressBar extends Component {
    handleMouseDown = (e) => {
        e.stopPropagation();
        this.animateScrubberButton(e);
    }

    animateScrubberButton = (e) => {
        this.props.dispatch({ type: 'PREVENT_MENU_HIDING' });
        this.props.dispatch({ type: 'PREVENT_UNHIGHLIGHT_PROGRESS_BAR' });
        let askedTime = this.calculateTimeFromXCoord(e.clientX);
        this.props.dispatch({ type: 'USER_ACTIVE' });
        this.props.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: askedTime } });
        document.addEventListener('mousemove', this.moveScrubberButton, true);
        document.addEventListener('mouseup', this.stopScrubberButton, true);
    };

    moveScrubberButton = (e) => {
        e.stopPropagation();
        let askedTime = this.calculateTimeFromXCoord(e.clientX);
        this.updateSizeProgressBarDesired(e.clientX - this.progressBarDesired.getBoundingClientRect().left);
        this.props.dispatch({ type: 'USER_ACTIVE' });
        this.props.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: askedTime } });
    };

    stopScrubberButton = (e) => {
        e.stopPropagation();
        document.removeEventListener('mousemove', this.moveScrubberButton, true);
        document.removeEventListener('mouseup', this.stopScrubberButton, true);
        let askedTime = this.calculateTimeFromXCoord(e.clientX);
        this.props.dispatch({ type: 'UPDATE_ASKED_TIME', payload: { askedTime: askedTime } });
        this.props.dispatch({ type: 'ALLOW_UNHIGHLIGHT_PROGRESS_BAR' });
        this.props.dispatch({ type: 'ALLOW_MENU_HIDING' });
        this.props.dispatch({ type: 'USER_ACTIVE' });
        this.updateSizeProgressBarDesired(e.clientX - this.progressBarDesired.getBoundingClientRect().left);
        if (!isInsideElement(this.progressBarWrapper, e))
            this.props.dispatch({ type: 'UNHIGHTLIGHT_PROGRESS_BAR' });
    };

    calculateTimeFromXCoord = (clientX) => {
        let x = clientX - this.progressBarWrapper.getBoundingClientRect().left;
        if (x <= 0 || this.props.duration === 0) {
            return 0;
        } else if (x >= this.progressBarWrapper.clientWidth) {
            return this.props.duration;
        } else {
            return x / (this.progressBarWrapper.clientWidth) * this.props.duration;
        }
    }

    handleMouseEnter = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'HIGHTLIGHT_PROGRESS_BAR' });
        this.updateSizeProgressBarDesired(e.clientX - this.progressBarDesired.getBoundingClientRect().left);
    }

    handleMouseLeave = (e) => {
        e.stopPropagation();
        if (this.props.allowUnhighlightProgressBar)
            this.props.dispatch({ type: 'UNHIGHTLIGHT_PROGRESS_BAR' });
        this.updateSizeProgressBarDesired(0);
    }

    handleMouseMove = (e) => {
        e.stopPropagation();
        this.updateSizeProgressBarDesired(e.clientX - this.progressBarDesired.getBoundingClientRect().left);
    }

    updateSizeProgressBarDesired = (size) => {
        if (size > this.progressBarWrapper.getBoundingClientRect().width) 
            size = this.progressBarWrapper.getBoundingClientRect().width;
        this.progressBarDesired.style.width = size + "px";
    };

    render = () => {

        let progressBarLeftMargin, loadedBarLeftMargin;
        if (this.props.duration > 0) progressBarLeftMargin = this.props.currentTime / this.props.duration * 100 + "%";
        if (this.props.duration > 0) loadedBarLeftMargin = this.props.timeRangeBuffered / this.props.duration * 100 + "%";
        else progressBarLeftMargin = "0%";
        let scrubberButton, progressBarWrappper, progressBarClassName, progressBarLoadedClassName, progressBarProgressionClassName, progressBarDesiredClassName;
        if (this.props.highlightProgressBar) {
            scrubberButton = <div className="wmp-scrubber-button" ref={node => (this.nodeScrubberButton = node)} style={{ left: progressBarLeftMargin }}></div>;
            progressBarWrappper = "wmp-progress-bar-wrapper wmp-progress-bar-wrapper-highighted";
            progressBarClassName = "wmp-progress-bar wmp-progress-bar-highighted";
            progressBarLoadedClassName = "wmp-progress-bar loaded wmp-progress-bar-highighted";
            progressBarProgressionClassName = "wmp-progress-bar progression wmp-progress-bar-highighted";
            progressBarDesiredClassName = "wmp-progress-bar desired wmp-progress-bar-highighted";

        } else {
            progressBarWrappper = "wmp-progress-bar-wrapper";
            progressBarClassName = "wmp-progress-bar";
            progressBarLoadedClassName = "wmp-progress-bar loaded";
            progressBarProgressionClassName = "wmp-progress-bar progression";
            progressBarDesiredClassName = "wmp-progress-bar desired";
        }

        return (
            <div className={progressBarWrappper} ref={progressBarWrapper => (this.progressBarWrapper = progressBarWrapper)} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseDown}>
                <div className={progressBarClassName}></div>
                <div className={progressBarLoadedClassName} style={{ width: loadedBarLeftMargin}}></div>
                <div className={progressBarProgressionClassName} style={{ width: progressBarLeftMargin, backgroundColor: this.props.color }}></div>
                <div className={progressBarDesiredClassName} ref={progressBarDesired => (this.progressBarDesired = progressBarDesired)}></div>
                {scrubberButton}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        timeRangeBuffered: state.timeRangeBuffered,
        highlightProgressBar: state.highlightProgressBar,
        currentTime: state.currentTime,
        duration: state.duration,
        progressBarLeftMargin: state.progressBarLeftMargin,
        allowUnhighlightProgressBar: state.allowUnhighlightProgressBar,
        color: state.color,
    };
};

export default connect(mapStateToProps)(ProgressBar);