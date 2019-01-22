import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

const options = {
    // not required, but use-full configuration option
    returnRejectedPromiseOnError: true,
    interceptors: {
        request: [
            ({ getState, dispatch }, config) => {
                // Request interception
                return config
            }
        ],
        response: [
            {
                success: ({ dispatch }, response) => {
                    // Response interception
                   // console.log('from interceptor', getAction);
                    return response
                },
                error: ({ dispatch }, error) => {
                    // Response Error Interception
                    return Promise.reject(error)
                }
            }
        ]
    }
};
export default axiosMiddleware(axios, options)
