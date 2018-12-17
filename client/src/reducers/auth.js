import * as types from "../actions/types";

const initialState = {
    isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_LOGIN:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true
            };
        case types.AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
