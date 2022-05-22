import { IState } from "../types/IState";

export const notLoading = () => ({ type: 'NOT_LOADING' });

const notLoadingReducer = (state: IState) => {
  return {
    ...state,
    isLoading: false,
  };
}

export default notLoadingReducer;