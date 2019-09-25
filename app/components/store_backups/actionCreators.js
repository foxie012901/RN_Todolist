import {
    HANDLE_STORE_CHANGE,
    ON_CHANGE_DATA,
    OPEN_ID,
    INIT_LIST_ACTION,
    GET_INIT_LIST
} from "./actionTypes";
import { NetGet } from "../util/request";

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
export const initListAction = (data) => ({
    type: INIT_LIST_ACTION,
    data
})

//saga 使用的
export const getInitList = () => ({
    type: GET_INIT_LIST
})


//thunk 使用的
// export const getTodolist = (url) => {
//     //实际上,当调取gettodolist生成内容是一个函数的时候,这个函数能够接受到store的dispattch方法,所以直接写一个dispatch就可以使用了
//     return (dispatch) => {
//         NetGet(url, null).then(res => {
//             // console.warn(res)
//             let { status, data } = res
//             if (status === 200) {
//                 console.log(data)
//                 const action = initListAction(data)
//                 dispatch(action)
//             }
//         })

//     }
// }