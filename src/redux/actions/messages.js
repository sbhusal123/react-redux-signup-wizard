import { GET_ERRORS, CREATE_MESSAGE } from "../actions/types";

// CREATE MESSAGE
export const createMessage = message => {
    return {
        type: CREATE_MESSAGE,
        payload: message
    };
};

// RETURN ERRORS
export const returnErrors = (message, status) => {
    return {
        type: GET_ERRORS,
        payload: { message, status }
    };
};
