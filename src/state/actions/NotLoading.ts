import { IState } from "../types/IState";

export const NOT_LOADING = 'NOT_LOADING';

export const notLoading = () => ({ type: NOT_LOADING });

const notLoadingReducer = (state: IState) => {
  return {
    ...state,
    isLoading: false,
  };
}

export default notLoadingReducer;