import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VolumeSlider.css';
import './Button.css';

class VolumeSlider extends Component {
    constructor(props){
        super(props);        
        this.nodeScrubberButton = React.createRef();
        this.nodeTotalBar = React.createRef();
    }

    handleMouseDownVolumeBar = (e) => {
        e.stopPropagation();
        this.animateVolumeScrubberButton(e);
    }

    animateVolumeScrubberButton = () => {
        this.props.dispatch({ type: 'SAVE_ACTUAL_VOLUME_AS_PAST_VOLUME' });   
        document.addEventListener('mousemove', this.moveVolumeScrubberButton, true);
        document.addEventListener('mouseup', this.stopVolumeScrubberButton, true);
        document.addEventListener('mouseleave', this.stopEventPropagation, true);
    };

    calculateScrubberButtonPositionFromVolume = (volume) => {
        return volume * (100 - this.nodeScrubberButton.clientWidth/this.nodeTotalBar.clientWidth)+"%";
    }

    moveVolumeScrubberButton = (e) => {
        e.stopPropagation();
        let volume = this.calculateVolumeFromXCoord(e.clientX);
        this.props.dispatch({ type: 'UPDATE_VOLUME', payload: {volume: volume}});
        this.props.dispatch({ type: 'UPDATE_VOLUME_SCRUBBER_BUTTON_POSITION', payload: {volumeSliderLeftMargin: this.calculateScrubberButtonPositionFromVolume(volume)}});
    };

    

    calculateVolumeFromXCoord = (clientX) => {
        let maxX = this.nodeTotalBar.clientWidth - this.nodeScrubberButton.clientWidth;
        if(maxX === 0) {
            return;
        }
        let x = clientX - this.nodeTotalBar.getBoundingClientRect().left;
        if (x > maxX) x = maxX;
        if (x <= 0){
            x = 0;
            this.props.dispatch({ type: 'MUTE' });  
        } else if(this.props.isMuted) {
            this.props.dispatch({ type: 'UNMUTE' });  
        }
        return x / maxX;
    }
    
    stopVolumeScrubberButton = (e) => {
        e.stopPropagation();
        document.addEventListener('click', this.preventClickAction, true);
        document.removeEventListener('mousemove', this.moveVolumeScrubberButton, true);
        document.removeEventListener('mouseup', this.stopVolumeScrubberButton, true);
        document.removeEventListener('mouseleave', this.stopEventPropagation, true);
        let volume = this.calculateVolumeFromXCoord(e.clientX);
        this.props.dispatch({ type: 'UPDATE_VOLUME', payload: {volume: volume}});
        this.props.dispatch({ type: 'UPDATE_VOLUME_SCRUBBER_BUTTON_POSITION', payload: {volumeSliderLeftMargin: this.calculateScrubberButtonPositionFromVolume(volume)}});

    };

    preventClickAction = (e) => {
        e.stopPropagation();
        document.removeEventListener('click', this.preventClickAction, true);	
    };

    stopEventPropagation = (e) => {
        e.stopPropagation();
    };

    handleMouseDownScrubberButton = (e) => {

    }

    componentDidMount = () => {
        this.props.dispatch({ type: 'UPDATE_VOLUME_SCRUBBER_BUTTON_POSITION', payload: {volumeSliderLeftMargin: this.calculateScrubberButtonPositionFromVolume(this.props.volume)}});
    }

    render = () => { 
        //let maxX = this.nodeTotalBar.clientWidth - this.nodeScrubberButton.clientWidth;
        
        /*this.view.volumeScrubberButton.style.left = this.state.volume * maxX +"px";
        this.view.volumeLevelBar.style.width = this.state.volume * maxX +"px";
        this.view.volumeLeftBar.style.left = this.state.volume * maxX +"px";*/
        return (
            <div className="wmp-tool-button wmp-volume-slider">
                <div className="wmp-volume-slider-total-bar" onMouseDown={this.handleMouseDownVolumeBar} ref={node => (this.nodeTotalBar = node)}>
                <div className="wmp-volume-slider-level-bar" style={{width:this.props.volumeSliderLeftMargin}}></div>
                    <div className="wmp-volume-slider-left-bar" style={{left:this.props.volumeSliderLeftMargin}}></div>
                    <div className="wmp-volume-slider-scrubber-button" style={{left:this.props.volumeSliderLeftMargin}} onMouseDown={this.handleMouseDownScrubberButton} ref={node => (this.nodeScrubberButton = node)}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        volume: state.volume,
        pastVolume: state.pastVolume,
        isMuted: state.isMuted,
        volumeSliderLeftMargin: state.volumeSliderLeftMargin,
    };
};

export default connect(mapStateToProps)(VolumeSlider);


    /*
    let maxX = this.view.volumeTotalBar.clientWidth - this.view.volumeScrubberButton.clientWidth;
    if(maxX === 0) {
        return;
    }
    let x = e.clientX - this.view.volumeTotalBar.getBoundingClientRect().left;
    if (x > maxX) x = maxX;
    if (x <= 0){
        x = 0;
        this.state.isMuted = true;
        this.mute();
    } else if(this.state.isMuted) {
        this.state.isMuted = false;
        this.unMute();
    }
    let volume = x / maxX;
    this.state.volume = volume;

    let maxX = this.view.volumeTotalBar.clientWidth - this.view.volumeScrubberButton.clientWidth;
    this.view.volumeScrubberButton.style.left = this.state.volume * maxX +"px";
    this.view.volumeLevelBar.style.width = this.state.volume * maxX +"px";
    this.view.volumeLeftBar.style.left = this.state.volume * maxX +"px";
    */