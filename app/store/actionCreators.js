import {
    CHANGE_INPUT_VALUE,
    INIT_LIST,
    DELETE_LIST_INDEX,
    GET_DATA,
    PUT_DATA_TO_LIST
} from "./actionTypes"

export const getChangeInputValue = value => ({
    type: CHANGE_INPUT_VALUE,
    value
})

export const InitList = () => ({
    type: INIT_LIST
})

export const delInitListIndex = (index) => ({
    type: DELETE_LIST_INDEX,
    index
})

export const getData = (data) => ({
    type: GET_DATA,
    data
})

export const putDataToList = () => ({
    type: PUT_DATA_TO_LIST
})
