import changeTotal from "./changeTotal";
import changeSearch from "./changeSearch";
import { combineReducers } from "redux";
import changeCategory from "./changeCategory";
import changeUser from "./changeUser";

const rootReducer = combineReducers({
    changeTotal , 
    changeSearch,
    changeCategory,
    changeUser
})

export default rootReducer;