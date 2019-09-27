import { actionTypes } from "./";

export const getChangeInputValue = value => ({
    type: actionTypes.CHANGE_INPUT_VALUE,
    value
})

export const InitList = () => ({
    type: actionTypes.INIT_LIST
})

export const delInitListIndex = (index) => ({
    type: actionTypes.DELETE_LIST_INDEX,
    index
})

export const getData = (data) => ({
    type: actionTypes.GET_DATA,
    data
})

export const putDataToList = () => ({
    type: actionTypes.PUT_DATA_TO_LIST
})
