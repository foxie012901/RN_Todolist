import {
    HANDLE_STORE_CHANGE,
    ON_CHANGE_DATA,
    OPEN_ID
} from "./actionTypes";
const defaultState = {
    inputValue: '',
    list: [
        1,
        2,
        3,
        4
    ]
}

export default (state = defaultState, action) => {


    if (action.type === HANDLE_STORE_CHANGE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value

        return newState
    }
    if (action.type === ON_CHANGE_DATA) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.push(state.inputValue)
        newState.inputValue = ''

        return newState
    }

    if (action.type === OPEN_ID) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)

        return newState
    }


    return state
}