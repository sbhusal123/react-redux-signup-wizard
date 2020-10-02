import {
    CREATE_AGENT_PROFILE_REQUEST,
    CREATE_AGENT_PROFILE_SUCCESS,
    CREATE_AGENT_PROFILE_FAIL
} from "../actions/types";

const initialState = {
    agent: {},
    loading: false,
    error: ""
};

const agentProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_AGENT_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_AGENT_PROFILE_SUCCESS:
            return {
                error: "",
                loading: false,
                agent: action.payload
            };
        case CREATE_AGENT_PROFILE_FAIL:
            return {
                agent: {},
                loading: false,
                error: action.payload
            };
        default:
            return {
                agent: state.agent
            };
    }
};

export default agentProfileReducer;
