const updateVolume = (state, action) => {
    
    return {
        ...state,
        volume: action.payload.volume
      };
}

export default updateVolume;