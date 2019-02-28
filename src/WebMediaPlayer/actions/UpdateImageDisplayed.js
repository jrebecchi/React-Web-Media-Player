const updateImageDisplayed = (state, action) => {
    
    return {
        ...state,
        imageDisplayed: action.payload.imageDisplayed
      };
}

export default updateImageDisplayed;