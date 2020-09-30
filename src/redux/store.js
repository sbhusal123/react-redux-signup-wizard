import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

/*
    Store Intro:
    -------------------------------------------------------------------------------------
    - Store manages the entire state of application.
    - Here redux thunk middleware is used to perform async actions.
    -------------------------------------------------------------------------------------
*/
const middleware = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
