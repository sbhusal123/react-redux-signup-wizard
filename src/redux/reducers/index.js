import { combineReducers } from "redux";

import universityReducer from "./university";
import countryReducer from "./country";

// When using Multiple reducers we use combineReducers

const rootReducer = combineReducers({
    // NameInStoreState: ImportedName
    // Caution: In mapStateToProps we access by NameInStoreState(Left One)
    universityReducer: universityReducer,
    countryReducer: countryReducer
});

export default rootReducer;
