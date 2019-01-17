import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProgressBar.css';

class ProgressBar extends Component {

    handleMouseEnter = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'HIGHTLIGHT_PROGRESS_BAR' });
        this.updateSizeProgressBarDesired(e.clientX - this.progressBarDesired.getBoundingClientRect().left);
    }

    handleMouseLeave = (e) => {
        e.stopPropagation();
        this.props.dispatch({ type: 'UNHIGHTLIGHT_PROGRESS_BAR' });
        this.updateSizeProgressBarDesired(0);
    }

    handleMouseMove = (e) => {
        e.stopPropagation();
        this.updateSizeProgressBarDesired(e.clientX - this.progressBarDesired.getBoundingClientRect().left);
    }

    updateSizeProgressBarDesired = (size) => {
        this.progressBarDesired.style.width = size + "px";
    };

    render = () => {

        let scrubberButton, progressBarWrappper, progressBarClassName, progressBarLoadedClassName, progressBarProgressionClassName, progressBarDesiredClassName;
        if (this.props.highlightProgressBar) {
            scrubberButton = <div className="wmp-scrubber-button"></div>;
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
            <div className={progressBarWrappper} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onMouseMove={this.handleMouseMove}>
                <div className={progressBarClassName}></div>
                <div className={progressBarLoadedClassName}></div>
                <div className={progressBarProgressionClassName}></div>
                <div className={progressBarDesiredClassName} ref={progressBarDesired => (this.progressBarDesired = progressBarDesired)}></div>
                {scrubberButton}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        highlightProgressBar: state.highlightProgressBar
    };
};

export default connect(mapStateToProps)(ProgressBar);

    /*
        this.highlightProgressBar = (x) => {
            this.updateSizeProgressBarDesired(x);
            this.view.progressBarWrapper.addEventListener("mousemove", this.moveProgressBarDesired);
            this.view.scrubberButton.classList.remove("hide");
            this.view.progressBarWrapper.classList.add("salefi-player-progress-bar-wrapper-highighted");
            this.view.progressBar.classList.add("salefi-player-progress-bar-highighted");
            this.view.progressBarProgression.classList.add("salefi-player-progress-bar-highighted");
            this.view.progressBarLoaded.classList.add("salefi-player-progress-bar-highighted");
            this.view.progressBarDesired.classList.add("salefi-player-progress-bar-highighted");
        };
    
        this.unhighlightProgressBar = (e) => {
            this.updateSizeProgressBarDesired(0);
            this.view.scrubberButton.classList.add("hide");
            this.view.progressBarWrapper.classList.remove("salefi-player-progress-bar-wrapper-highighted");
            this.view.progressBar.classList.remove("salefi-player-progress-bar-highighted");
            this.view.progressBarProgression.classList.remove("salefi-player-progress-bar-highighted");
            this.view.progressBarLoaded.classList.remove("salefi-player-progress-bar-highighted");
            this.view.progressBarDesired.classList.remove("salefi-player-progress-bar-highighted");
        };*/