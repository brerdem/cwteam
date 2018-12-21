import * as types from "../actions/types";

const initialState = {
    isGanttFullscreen: false
};


const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GANTT_FULLSCREEN:
            return {
                ...state,
                isGanttFullscreen: action.status
            };

        default:
            return state;
    }
};

export default uiReducer;
