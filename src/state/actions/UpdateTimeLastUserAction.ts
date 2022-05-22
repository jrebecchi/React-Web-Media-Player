import { IState } from "../types/IState";

export const updateTimeLastUserAction = () => ({type: 'USER_ACTIVE'});

const updateTimeLastUserActionReducer = (state: IState) => {
    return {
        ...state,
        timeLastUserAction: new Date()
      };
}

export default updateTimeLastUserActionReducer;