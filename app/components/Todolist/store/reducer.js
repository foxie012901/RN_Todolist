import { actionTypes } from "./index";
import { fromJS } from "immutable";

const defaultState = fromJS({
    inputValue: '',
    list: ['a','b','c']
})

export default (state = defaultState, action) => {
    if (action.type === actionTypes.CHANGE_INPUT_VALUE) {
        // const newState = JSON.parse(JSON.stringify(state))
        // newState.inputValue = action.value
        // return newState
        return state.set('inputValue', action.value)
    }
    if (action.type === actionTypes.INIT_LIST) {
        // const newState = JSON.parse(JSON.stringify(state))
        // newState.list.push(state.inputValue)
        // newState.inputValue = ''
        // return newState
        // return state.set('list',state.get('list').concat(state.get('inputValue')))
        return (state.update('list', item=>item.concat(state.get('inputValue'))).set('inputValue',null))
    }
    if (action.type === actionTypes.DELETE_LIST_INDEX) {
        // const newState = JSON.parse(JSON.stringify(state))
        // newState.list.splice(action.index, 1)
        // return newState

        return state.update('list', item => item.delete(action.index))
    }
    if (action.type === actionTypes.GET_DATA) {
        // const newState = JSON.parse(JSON.stringify(state))
        // newState.list = action.data
        // return newState

        return state.set('list', action.data)
    }
    return state
}