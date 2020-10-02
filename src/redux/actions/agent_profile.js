import axios from "axios";

import {
    CREATE_AGENT_PROFILE_REQUEST,
    CREATE_AGENT_PROFILE_FAIL,
    CREATE_AGENT_PROFILE_SUCCESS
} from "./types";

import { returnErrors, createMessage } from "./messages";

export const createAgentProfile = agetData => {
    console.log(...agetData);
    return dispatch => {
        dispatch(createAgentProfileRequest());

        axios
            .post("http://localhost:8000/api/agent_profile/", agetData)
            .then(res => {
                dispatch(createAgentProfileSuccess(res.data));
                localStorage.removeItem("user_id");
                dispatch(
                    createMessage({
                        info: "Agent profile created successfully."
                    })
                );
            })
            .catch(error => {
                dispatch(createAgentProfileFailed(error.response.data));
                dispatch(
                    returnErrors(error.response.data, error.response.status)
                );
            });
    };
};

export const createAgentProfileRequest = () => {
    return {
        type: CREATE_AGENT_PROFILE_REQUEST
    };
};

export const createAgentProfileSuccess = newAgentData => {
    return {
        type: CREATE_AGENT_PROFILE_SUCCESS,
        payload: newAgentData
    };
};

export const createAgentProfileFailed = error => {
    return {
        type: CREATE_AGENT_PROFILE_FAIL,
        payload: error
    };
};
