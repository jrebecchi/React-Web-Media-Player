import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const UPDATE_VIDEO_WIDTH = 'UPDATE_VIDEO_WIDTH';

export const updateVideoWidth = (videoWidth: number) => ({ type: UPDATE_VIDEO_WIDTH, payload: { videoWidth } });

const updateVideoWidthReducer = (state: IState, action: IAction) => {

  return {
    ...state,
    videoWidth: action.payload.videoWidth
  };
}

export default updateVideoWidthReducer;