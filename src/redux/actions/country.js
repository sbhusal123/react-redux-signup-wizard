import axios from "axios";

import {
    FETCH_COUNTRY_FAIL,
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_REQUEST
} from "./types";

export const fetchCountry = () => {
    return dispatch => {
        dispatch(fetchCountryRequest());

        axios
            .get("http://localhost:8000/api/countries/")
            .then(res => {
                const countries = res.data;
                dispatch(fetchCountrySuccess(countries));
            })
            .catch(error => {
                dispatch(fetchCountryFailed(error));
            });
    };
};

export const fetchCountryRequest = () => {
    return {
        type: FETCH_COUNTRY_REQUEST
    };
};

export const fetchCountrySuccess = countries => {
    return {
        type: FETCH_COUNTRY_SUCCESS,
        payload: countries
    };
};

export const fetchCountryFailed = error => {
    return {
        type: FETCH_COUNTRY_FAIL,
        payload: error.message
    };
};
