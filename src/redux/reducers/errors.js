import { GET_ERRORS } from "../actions/types";

const initialState = {
    message: {},
    status: null
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                message: action.payload.message,
                status: action.payload.status
            };
        default:
            return state;
    }
};

export default errorReducer;
