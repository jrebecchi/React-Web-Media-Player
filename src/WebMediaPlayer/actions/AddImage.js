//this.props.dispatch({ type: 'ADD_IMAGE', payload: { index: i, image: image } });
const addImage = (state, action) => {

    return {
        ...state,
        slideshow: state.slideshow.map(
            (content, i) => i === action.payload.index ? { ...content, element: action.payload.image } : content
        )
    }
};

export default addImage;


