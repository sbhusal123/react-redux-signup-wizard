import { combineReducers } from "redux";

import universityReducer from "./university";
import countryReducer from "./country";
import userReducer from "./user";
import errorReducer from "./errors";
import messageReducer from "./messages";
import agentProfileReducer from "./agent_profile";

// When using Multiple reducers we use combineReducers

const rootReducer = combineReducers({
    // NameInStoreState: ImportedName
    // Caution: In mapStateToProps we access by NameInStoreState(Left One)
    universityReducer: universityReducer,
    countryReducer: countryReducer,
    userReducer: userReducer,
    agentProfileReducer: agentProfileReducer,
    errorReducer: errorReducer,
    messageReducer: messageReducer
});

export default rootReducer;
