const preventUnhighlightProgressBar = (state) => {
    return {
        ...state,
        allowUnhighlightProgressBar: false,
        allowMenuHiding: false
      };
}

export default preventUnhighlightProgressBar;