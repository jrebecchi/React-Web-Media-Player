const preventUnhighlightProgressBar = (state) => {
    return {
        ...state,
        allowUnhighlightProgressBar: false,
      };
}

export default preventUnhighlightProgressBar;