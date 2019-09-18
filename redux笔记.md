# redux 的使用
    安装  -yarn add redux

## 文件 介绍
    index.js 一个store的主文件
    reducer.js 一个store的管理员文件
    actionTypes.js 统一管理我们的action type字符串，以免代码量巨大，出现错误难以定位
    actionCreators.js 统一管理我们的action创建事件，提高维护性，前端有自动化测试工具，把action都写在一个文件里，做自动化测试时也比较方便

## 基础 要点
    1. store 是唯一的  在index.js里创建
    2. 只有store能够改变自己的内容，而不是reducer，reducer只是接到action创建了一个新的变量，改变了新的变量，然后返回给store，store接到reducer的返回并修改了自己的内容
    3. reducer必须是一个纯函数，纯函数指的是给定固定的输入，就一定会有固定的输出，而且不会有任何副作用，所以，reducer里不能有对异步，时间，日期等变化的或不一定的操作。副作用指的是对不该你操作的参数进行修改，就属于副作用

## 核心api
    1. createStore 可以帮助我们创建一个store  ，在index.js文件里
    2. store.dispatch  可以帮助我们派发action，传递给store，在使用的组件中
    3. store.getState 可以帮助我们获取到store里面的所有内容  在使用的组件中
    4. store.subscribe 可以帮助我们订阅store的改变，只要store改变，他订阅接收到的回调函数就会被执行。  在使用的组件中

# yarn add redux
```js 创建仓库
    //创建一个store文件夹
    //在store下创建一个index.js文件
    //创建好了一个仓库
    import { createStore } from "redux";
    //引入创建好的管理员
    import reducer from "./reducer";
    
    const store = createStore(reducer) //把管理员传给仓库里

    export default store
    //==================================================
    //创建一个reducer.js文件
    const defaultState ={ 
        inputValue:'',
        list:[],

    }// 默认仓库数据

    export default (state = defaultState, action )=>{ //现在默认state里就是一个空对象 
         // console.warn(state, action)
    //state 是我们的默认或者说原始的状态

    //action 是通过使用的地方传递过来的数据

        //注意:reducer里只能接受state,不能改变state
    if(action.type === 'change_input_value'){ '值对应调用的地方设置的type'
        const newState = JSON.parse(JSON.stringify(state))  // 拷贝原数据state
        newState.inputValue = action.value // 改变新数据里的inputvalue使其等于action。value传递过来的值
        return newState  // 返回结果
    }

    if(action.type ==='on_change_data'){
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue = ""
        return newState  
    }


        return state
    }

```

```js 使用仓库
    import store from './store' // 我们平时的完整写法,我们也可以不写.js,甚至我们创建的名称是index的话作为默认,也可以不写
    constructor(props){
        super(props)
        this.state = store.getState()  //getState,是store提供的通过这个方法获取store里的数据
    }    
    store.subscribe(this._handleStoreChange)//我们的组件去订阅store，就是说，只要store里的数据改变，subscribe里面就会执行某些事件

    render(){
        return (
            组件  注册 点击事件 fun 改变值的，带value的。 和点击事件 btnfun
        )
    }
    fun=e=>{
        const action ={
            type:'change_input_value',
            value:e
        }
        store.dispatch(action) // 通过。dispatch传递给store里的reducer
    }

    btnfun=()=>{
        const action = {
            type:'on_change_data'
        }
        store.dispatch(action)
    }

    _handleStoreChange=()=>{
        this.setState(store.getState()) //通过构造里订阅跳转过来，执行的更新redux数据的操作
    }

```



====================================================================================

# 总结 关键字
```js
--------------index.js---------------------
import {createStore} from 'redux'  //引用redux 
import reducer from './reducer'    //导入reducer管理员
const store =createStore(reducer)  //把管理员传给仓库
export default store
--------------reducer.js-------------------
const defaultState={} // reducer中默认数据对象
state  //我们的默认初始化状态  
action //是使用的地方传递过来的状态
if(action==='type'){
    const newState = JSON.parse(JSON.stringify(state)) 
        执行数据改变操作
    return newState
    //我们不能直接操作改变原始数据，只能通过深藏拷贝创建一个新的变量来改变数据，并返回新的变量
}
---------------使用处.js组件----------------------------
import from './store'  // 默认在store里创建了index文件，默认会找它，默认会省略。js，所以可简写
constructor(props){
    super(props)
    this.state = store.getState() //当前组件数据等于redux的数据
    store.subcribe(this._handleStoreChange) //我们的组件去订阅store，如果store数据有改变，我们就执行方法，去更新当前数据
}
_handleStoreChange=()=>{this.setState(store.getState())} //执行方法改变当前组件中的数据
render(){
    return(
        <input组件   
            onChangeText={this._handleinputChange}
        />
        <btn组件 
            onPress={this._handleChange}
        />
        <FlatList 
            renderItem={this.显示组件}
        />
    ) 
}
_handleInputChange = e => {
        const action = {
            type: "type", //reducer里的action===的值
            value: e,
        } // 创建了一个行为action，你帮我去改变inputvalue的值
        store.dispatch(action)
        //通过dispatch把我们的行为action传递给store  store就相当于一个仓库,他并不会管理数据而是自动推送给reducers来管理
}
_handleChange = () => {
        //创建一个action行为
        const action = {
            type: 'type',
        }
        store.dispatch(action)
    }
```
===========================================================
# redux 进阶 

## 傻瓜组件 和 聪明组件

### 傻瓜组件 
    只负责页面ui的渲染，并没有任何的逻辑

### 聪明组件  或叫 容器组件
    它并不负责页面怎样渲染，只关心整个页面的业务逻辑，负责整个组件的功能实现

## 无状态组件 
    1. 当我们去定义一个ui组件的时候，它只负责页面渲染没有任何的逻辑操作的时候，这个时候，我们可以选择使用无状态组件。
    2. 优势-一般生成的类组件，比较重量，会有很多属性，生命周期函数等，而我们的无状态组件就只是一个函数而已，性能更高
    3. 补充，当然我们如果需要让ui组件做一些逻辑就得使用类组件了。具体怎么使用还要按照我们的需求来。
```js
export default const Todolist = (props) =>{
    return (
        <View>
            页面ui渲染
        </View>
    )
}
````