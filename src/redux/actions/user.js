import axios from "axios";

import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL
} from "./types";

import { returnErrors, createMessage } from "./messages";

export const createUser = userData => {
    return dispatch => {
        dispatch(createUserRequest());

        axios
            .post("http://localhost:8000/api/users/", { ...userData })
            .then(response => {
                const user = response.data;
                dispatch(createUserSuccess(user));
                localStorage.setItem("user_id", user.id);
                dispatch(createMessage({ info: "User created successfully." }));
            })
            .catch(error => {
                dispatch(createUserFailed(error.response.data));
                dispatch(
                    returnErrors(error.response.data, error.response.status)
                );
            });
    };
};

export const createUserRequest = () => {
    return {
        type: CREATE_USER_REQUEST
    };
};

export const createUserSuccess = user => {
    return {
        type: CREATE_USER_SUCCESS,
        payload: user
    };
};

export const createUserFailed = error => {
    return {
        type: CREATE_USER_FAIL,
        payload: error
    };
};
