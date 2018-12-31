import {getToken} from "./auth";

//action creators
export const getAllUsers = () => {
    console.log('getAllUsers:', );

    return {
        types: ['GET_ALL_USERS_LOAD', 'GET_ALL_USERS_DONE', 'GET_ALL_USERS_ERROR'],
        payload: {
            request: {
                method: 'get',
                url: '/user/all',
                headers: { 'Authorization': 'bearer '+ getToken() },

            }
        }
    }
};









