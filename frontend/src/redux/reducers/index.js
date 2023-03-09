import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./Profile";


export default combineReducers({
    auth,
    profile
})