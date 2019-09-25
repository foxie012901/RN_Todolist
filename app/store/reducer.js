import {
    CHANGE_INPUT_VALUE,
    INIT_LIST,
    DELETE_LIST_INDEX,
    GET_DATA
} from "./actionTypes";

const defaultState = {
    inputValue: '',
    list: []
}

export default (state = defaultState, action) => {
    if (action.type === CHANGE_INPUT_VALUE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    if (action.type === INIT_LIST) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.push(state.inputValue)
        newState.inputValue = ''
        return newState
    }
    if (action.type === DELETE_LIST_INDEX) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState
    }
    if (action.type === GET_DATA) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list = action.data
        return newState
    }
    return state
}