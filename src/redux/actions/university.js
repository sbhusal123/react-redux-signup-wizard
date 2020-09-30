import axios from "axios";

import {
    FETCH_UNIVERSITY_REQUEST,
    FETCH_UNIVERSITY_SUCCESS,
    FETCH_UNIVERSITY_FAIL
} from "./types";

/*
    Action Creator Intro
    -----------------------------------------------------------------------------------------------------
    - Creates and dispatches appropriate action for handelling api calls.
    - Async request dispatching are handled by redus think middlewares.
    -----------------------------------------------------------------------------------------------------

    How is action reduced? (Action -> Reducer)
    -----------------------------------------------------------------------------------------------------
    - We pass the ActionType and anyother vars. Those are received in action variable of our reducer.
    -----------------------------------------------------------------------------------------------------
*/

// Api request is performed here, and appropriate
export const fetchUniversity = () => {
    // Dispatch is argument passed by thunk, for async actions
    return dispatch => {
        // Changes State to loading: True
        dispatch(fetchUniversityRequest());

        // Fetch Universities List
        axios
            .get("http://localhost:8000/api/universities/")
            .then(res => {
                const universities = res.data;

                // Changes State loading to False, universities to list of universities
                dispatch(fetchUniversitySuccess(universities));
            })
            .catch(error => {
                // If error occurs in fetching, dispatch failed
                dispatch(fetchUniversityFail(error.message));
            });
    };
};

/*
    Every action below are passed to reducer.
*/

// Action Creator to run Before Api Request
export const fetchUniversityRequest = () => {
    return {
        type: FETCH_UNIVERSITY_REQUEST
    };
};

// Action Creator For Successfull Api Response
export const fetchUniversitySuccess = universities => {
    return {
        type: FETCH_UNIVERSITY_SUCCESS,
        payload: universities
    };
};

// Action Creator for Failed Api Response
export const fetchUniversityFail = error => {
    return {
        type: FETCH_UNIVERSITY_FAIL,
        payload: error
    };
};
