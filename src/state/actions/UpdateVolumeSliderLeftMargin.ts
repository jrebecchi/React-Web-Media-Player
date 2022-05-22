import { IAction } from "../types/IAction";
import { IState } from "../types/IState";

export const updateVolumeSliderLeftMargin = (volumeSliderLeftMargin: string) => ({type: 'UPDATE_VOLUME_SLIDER_LEFT_MARGIN', payload: { volumeSliderLeftMargin } });

const updateVolumeSliderLeftMarginReducer = (state: IState, action: IAction) => {
    
    return {
        ...state,
        volumeSliderLeftMargin: action.payload.volumeSliderLeftMargin
      };
}

export default updateVolumeSliderLeftMarginReducer;