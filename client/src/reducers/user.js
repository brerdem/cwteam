const initialState = [];


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_USERS_DONE':

            return action.payload.data;

        default:
            return state;
    }
};

export default userReducer;
