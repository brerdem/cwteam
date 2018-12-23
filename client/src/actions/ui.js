import * as types from "./types";


//action creators
const setGanttFullScreen = (stat) => ({
    type: types.GANTT_FULLSCREEN,
    status: stat
});


export const setFullScreen = (stat) => dispatch => {
    dispatch(setGanttFullScreen(stat));
};


