import * as types from "./types";





//action creators
const setGanttFullScreen = () => ({
    type: types.GANTT_FULLSCREEN,
});


export const setFullScreen = () => dispatch => {
    dispatch(setGanttFullScreen());
};


