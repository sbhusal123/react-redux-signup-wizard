import {
    FETCH_UNIVERSITY_REQUEST,
    FETCH_UNIVERSITY_SUCCESS,
    FETCH_UNIVERSITY_FAIL
} from "../actions/types";

/*
    Reducer Intro
    ---------------------------------------------------------------------------------
    ->  Reducers notifies the store about the state change.
    ->  They perform the state change in store detecting appropriate action type.
    ---------------------------------------------------------------------------------
*/

const initialState = {
    universities: [],
    loading: false,
    error: ""
};

/* 
    Performs Appropriate state change on store after action is completed:
    Here action(type and data) are received in action variable.
*/
const universityReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_UNIVERSITY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_UNIVERSITY_SUCCESS:
            return {
                loading: false,
                universities: action.payload,
                error: ""
            };
        case FETCH_UNIVERSITY_FAIL:
            return {
                loading: false,
                universities: [],
                error: action.payload
            };
        default:
            return {
                universities: state.universities
            };
    }
};

export default universityReducer;
