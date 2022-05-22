import { IState } from "../types/IState";

export const loading = () => ({ type: 'LOADING'});

const loadingReducer = (state: IState) => {
  return {
    ...state,
    isLoading: true,
  };
}

export default loadingReducer;