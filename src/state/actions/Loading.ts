import { IState } from "../types/IState";

const loadingReducer = (state: IState) => {
  return {
    ...state,
    isLoading: true,
  };
}

export default loadingReducer;