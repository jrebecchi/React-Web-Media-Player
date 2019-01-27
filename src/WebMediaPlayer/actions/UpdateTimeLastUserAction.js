const updateTimeLastUserAction = (state) => {
    return {
        ...state,
        timeLastUserAction: new Date()
      };
}

export default updateTimeLastUserAction;