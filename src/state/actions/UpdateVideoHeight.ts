import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const UPDATE_VIDEO_HEIGHT = 'UPDATE_VIDEO_HEIGHT';

export const updateVideoHeight = (videoHeight: number) => ({ type: UPDATE_VIDEO_HEIGHT, payload: { videoHeight } });

const updateVideoHeightReducer = (state: IState, action: IAction) => {

  return {
    ...state,
    videoHeight: action.payload.videoHeight
  };
}

export default updateVideoHeightReducer;