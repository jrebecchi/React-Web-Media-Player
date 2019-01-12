const saveActualVolumeAsPastVolume = (state) => {
    
    return {
        ...state,
        pastVolume: state.volume
      };
}

export default saveActualVolumeAsPastVolume;