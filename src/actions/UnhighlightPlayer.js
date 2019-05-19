const unhighlightPlayer = (state) => {
    return {
        ...state,
        isPlayerHighlighted: false
    };
}

export default unhighlightPlayer;