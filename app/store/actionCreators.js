import {
    HANDLE_STORE_CHANGE,
    ON_CHANGE_DATA,
    OPEN_ID
} from "./actionTypes";

export const getHandleStoreChange = value => ({
    type: HANDLE_STORE_CHANGE,
    value,
})

export const getOnChangeData = () => ({
    type: ON_CHANGE_DATA
})

export const getOpenId = (index) => ({
    type: OPEN_ID,
    index
})