import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import { dashboardReducer } from "./reducers/dashboardReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer
});

export default rootReducer;

