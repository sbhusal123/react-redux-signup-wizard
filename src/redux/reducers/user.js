import {
    CREATE_USER_SUCCESS,
    CREATE_USER_REQUEST,
    CREATE_USER_FAIL
} from "../actions/types";

const initialState = {
    user: [],
    error: "",
    loading: true
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_USER_FAIL:
            return {
                user: [],
                error: action.payload,
                loading: false
            };
        case CREATE_USER_SUCCESS:
            return {
                user: action.payload,
                loading: false,
                error: ""
            };
        default:
            return {
                user: state.user
            };
    }
};

export default userReducer;
