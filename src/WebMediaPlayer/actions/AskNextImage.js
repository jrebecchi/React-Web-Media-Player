const askNextImage = (state) => {
    return {
        ...state,
        askNextImage: new Date(),
    };
}

export default askNextImage;