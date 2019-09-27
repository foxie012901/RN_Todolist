import { combineReducers } from "redux";

import {todolistReducer} from "../components/Todolist/store";

const reducer =  combineReducers({
    todolist:todolistReducer,
})

export default reducer