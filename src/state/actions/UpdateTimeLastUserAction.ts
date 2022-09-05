import { IState } from "../types/IState";

const updateTimeLastUserActionReducer = (state: IState) => {
    return {
        ...state,
        timeLastUserAction: new Date()
      };
}

export default updateTimeLastUserActionReducer;