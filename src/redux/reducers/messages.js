import { CREATE_MESSAGE } from "../actions/types";

const initialState = {
    message: {}
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MESSAGE:
            return {
                message: action.payload
            };
        default:
            return {
                message: state.message
            };
    }
};

export default messageReducer;
