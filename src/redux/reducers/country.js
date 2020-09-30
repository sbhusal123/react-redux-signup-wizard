import {
    FETCH_COUNTRY_REQUEST,
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_FAIL
} from "../actions/types";

const initialState = {
    countries: [],
    loading: true,
    error: ""
};

export const countryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COUNTRY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_COUNTRY_SUCCESS:
            return {
                loading: false,
                error: "",
                countries: action.payload
            };
        case FETCH_COUNTRY_FAIL:
            return {
                loading: false,
                error: action.payload,
                countries: []
            };
        default:
            return {
                countries: state.countries
            };
    }
};

export default countryReducer;
