import { IState } from "../types/IState";

const notLoadingReducer = (state: IState) => {
  return {
    ...state,
    isLoading: false,
  };
}

export default notLoadingReducer;