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
```
==============================================================
## redux-thunk redux中间件 增强redux性能
    安装redux中间件 插件  - yarn add redux-thunk
    概念:dispatch一个action之后，到达reducer之前，进行一些额外的操作，就需要用到middleware。你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。
    换言之，中间件都是对store.dispatch()的增强

1. 首先安装redux thunk的安装 
2. 我们在创建store的时候使用中间件thunk
```js redux index.js 使用thunk中间件,参见官方文档配置,然后通过创建enhancer把它传递给createStore的第二个参数,就使得我们现在的仓库,即使用了thunk的中间件,又使用了redux-devtools开发者工具
    import { createStore,applyMiddleware ,compose} from "redux";
    import thunk from "redux-thunk";

    import reducer from "./reducer";

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
    const enhancer = composeEnhancers(
        applyMiddleware(thunk)
    )
    const store = createStore(
        reducer,
        enhancer
    )

    export default store
```

3. 配置好redux thunk环境之后,他可以使得我们在action里去写异步的代码了
    当我们的组件挂在完成的时候,以前创建一个action只能是一个js的对象,但是使用redux thunk之后即使返回数据不是一个对象了,而是一个函数,也可以通过store.dispatch把这个函数发给store了.这样,我们的store仓库不仅可以管理数据,也可以管理方法,如果不用thunk,那么代码会报错,提示action必须是一个对象
```js
    componentDidMount(){
        const action = getTodolist();
        store.dispatch(action)
    }
```
    引申:优化代码,把请求数据封装进redux的store里

4. 当store发现dispatch接收到了一个函数,它就会干一件事,帮你执行以下action对应的函数,比如是一个请求数据的函数,action对应的函数会自动继承dispatch,所以在action中的函数也可以继续生成新的action对象并通过dispatch给store
```js
export const initListAction = data => ({
    type: INIT_LIST_ACTION,
    data
})
export const getTodolist = (url) => {
    //实际上,当调取gettodolist生成内容是一个函数的时候,这个函数能够接受到store的dispattch方法,所以直接写一个dispatch就可以使用了
    return (dispatch) => {
        NetGet(url, null).then(res => {
            // console.warn(res)
            let { status, data } = res
            if (status === 200) {
                console.log(data)
                const action = initListAction(data) // initListAction(data)
                dispatch(action)
            }
        })

    }
}
```

5. 优势,当我们把请求数据等操作放进生命周期函数,它会变得越来越负责,越来越多,组件变得越来越大,所以推荐把复杂的业务逻辑和异步请求拆分到一个地方去管理的,现在我们就可以通过redux thunk把这些操作放到actionCreators.js里面去管理了,放在这里带来了额外的好处,当我们去做自动化测试的时候,我们在测这些操作的时候会非常简单,他比测试一个组件的生命周期函数要简单的多. 

6. 总结,我们用redux thunk对dispatch进行了升级, 默认dispatch只能接受对象,升级后可以接受函数了;redux的中间件有很多,具体baidu 

=======================================================================================
## redux-saga redux中间件 增强redux性能
    概念:redux-saga 是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。

可以想像为，一个 saga 就像是应用程序中一个单独的线程，它独自负责处理副作用。 redux-saga 是一个 redux 中间件，意味着这个线程可以通过正常的 redux action 从主应用程序启动，暂停和取消，它能访问完整的 redux state，也可以 dispatch redux action。

redux-saga 使用了 ES6 的 Generator 功能，让异步的流程更易于读取，写入和测试。（如果你还不熟悉的话，这里有一些介绍性的链接） 通过这样的方式，这些异步的流程看起来就像是标准同步的 Javascript 代码。（有点像 async/await，但 Generator 还有一些更棒而且我们也需要的功能）。

你可能已经用了 redux-thunk 来处理数据的读取。不同于 redux thunk，你不会再遇到回调地狱了，你可以很容易地测试异步流程并保持你的 action 是干净的。

### 为什么会有 redux-saga
    为什么会有redux-saga
中间件用过redux-thunk，也用过redux-promise-middleware，原理都很简单。

thunk就是简单的action作为函数，在action进行异步操作，发出新的action。
而promise只是在action中的payload作为一个promise，中间件内部进行处理之后，发出新的action。

这两个简单也容易理解，但是当业务逻辑多且复杂的时候会发生什么情况呢？我们的action越来越复杂，payload越来越长，当然我们可以分离开来单独建立文件去处理逻辑，但是实质上还是对redux的action和reducer进行了污染，让它们变得不纯粹了，action就应该作为一个信号，而不是处理逻辑，reducer里面处理要好一些，但是同样会生出几个多余的action类型进行处理，而且也只能是promise，不能做复杂的业务处理。

redux-saga将进行异步处理的逻辑剥离出来，单独执行，利用generator实现异步处理。

### 安装saga 创建saga 使用saga 搭建saga
1. 安装saga -yarn add redux-saga
2. redux的index中创建saga中间件并使用
```js redux 的 index.js 
    import { createStore,applyMiddleware ,compose} from "redux";
    import reducer from "./reducer";

    import createSagaMiddleware from "redux-saga";  //引入saga的创建中间件
    import todoSagas from './sagas'  //引入sagas.js

    const sagaMiddleware = createSagaMiddleware() // 创建saga中间件
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;  //配置调试器
    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware) //添加saga中间件到enhancer里
    )
    const store = createStore(
        reducer,
        enhancer
    )
    sagaMiddleware.run(todoSagas)  //开启saga中间件

    export default store
```
3. 创建 sagas.js 并使用generator函数初始化格式
   generator 函数的概念 ===> ES6
        1、什么是 Generator 函数

        在Javascript中，一个函数一旦开始执行，就会运行到最后或遇到return时结束，运行期间不会有其它代码能够打断它，也不能从外部再传入值到函数体内

        而Generator函数（生成器）的出现使得打破函数的完整运行成为了可能，其语法行为与传统函数完全不同

        Generator函数是ES6提供的一种异步编程解决方案，形式上也是一个普通函数，但有几个显著的特征：
        详情请看下面地址的介绍:
        https://www.cnblogs.com/rogerwu/p/10764046.html

```js store下创建 sagas.js
    function* mySaga() {

    }

    export default mySaga
```
4. 使用saga 封装异步请求数据

```js
import { takeEvery, put } from "redux-saga/effects";
import { GET_INIT_LIST } from "./actionTypes";
import { initListAction } from "./actionCreators";
import axios from 'axios'

function* getInitList() {
    try {
        const res = yield axios.get('http://localhost.charlesproxy.com:3000/list.json');
        let { status, data } = res.data
        if (status === 200) {
            const action = initListAction(data)
            yield put(action)  //因为saga没有dispatch,所以得用put,效果一样 ,加yield表示等action处理完成之后再继续往下执行代码
        }
    } catch (e) {
        console.log('list.json 网络请求失败')
    }
}

function* mySaga() {
    yield takeEvery(GET_INIT_LIST, getInitList) //当saga收到GET_INIT_LIST,就会执行getInitList方法
    //当我们派发action的时候,不仅仅是reducer能收到,sagas也能收到,一旦sagas接收到就会根据需求执行方法
}

export default mySaga

```
==============================================================
## react-redux

### 核心API Provider
    Provider 的意思是这个提供器连接了store,那么Provider里面所有的组件都有能力获得store里的内容了
```js 根组件 Main.js
    import { Provider } from "react-redux";
    import store from './app/store'

    render(){
        return (
            <Provider store={store}>
                <组件 />
            </Provider>
        )
    }
```

### 核心API connect
    export default connect(null,null) (TodoList) 他的意思是,让我的todolist组件和store进行连接
    connect的方法就是让组件和store做连接
    因为之前通过Provider把我们的根组件包裹起来了,并绑定了store,我们的todolist组件在根组件下,那么就可以通过connect方法把我们的组件和store进行连接
```js 需要连接store的组件.js
    import {connect} from 'react-redux'

    class 组件 extends Component{
        constructor(props){
            super(props)
            this.state={

            }
        }
        componentDidMount(){

        }
        render(){
            return (
                <组件
                    inputValue = {this.props.inpuValue}
                    _handleInputChange={this.props._handleInputChange}

                    //这里使用this.props而不是this.state了,
                    //因为我们在下面的mapStateToProps里面把store里的数据绑定在props里面了
                    list={this.props.list}
                />
            )
        }
    

    }
const mapStateToProps = (state) => {
    //这个函数会默认接受一个state,就是store里面的数据,他会return 一个对象出去
    return {
        inputValue:state.inputValue ,
        list:state.list
    }
}

const mapDispatchToProps =(dispatch)=>{
    return {
        _handleInputChange(value){
            // console.warn(e)
            const action = {
                type:'change_input_value',
                value
            }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
//我要让我们的组件跟store做一个连接,那么久需要一个规则,规则就在mapStateToProps这个函数里面
// mapStateToProps字面翻译就是把store里面的数据映射到组件的props里面
//我们要修改store里的数据 可以通过mapDispatchToProps 来实现
//mapDispatchToProps ,dispatch 值得就是store.dispatch, props
//在mapDispatchToProps里返回对象,对象里创建action,然后通过dispatch发送给store进行处理


```

### react-redux 总结
    todolist是一个ui组件他只有渲染代码,connect把ui组件和业务逻辑mapDispatchToProps和mapStateToProps结合,
    所以connect执行返回的结果是一个容器组件 ,容器组件可以理解成,他就是存一些业务逻辑,然后通过把UI组件进行包装调用UI组件,在调用的时候,它把数据和方法都准备好.


=========================================================

## 整合reducer,通过combineReducers来实现
    原理: 我们在研发中时,我们的数据和数据的处理都放在reducer.js了,随着功能的开发,数据量会越来越大,一个文件的代码超过300行,就说明设计是有问题的,所以我们不能让reducer变得那么大.
    解决办法: 我们可以把这一个reducer拆成很多个小的reducer进行管理

### 步骤
1. 打开app/components下的某个组件文件夹下,创建一个store文件夹,在文件夹下创建reducer.js,actionType.js,actionCreators.js这些文件,并关联好
2. 在app/store下的reducer.js,创建关联关系
```js app/store/reducer.js
import { combineReducers } from "redux";

import todolistReducer from "../components/Todolist/store/reducer";

export default combineReducers({
    todolist:todolistReducer // 这里的todolist就是我们在组件中要使用的关键字
})
```
3. 组件中使用.
```js
import { getChangeInputValue,
    InitList,
    delInitListIndex,
    getData,
    putDataToList } from './store/actionCreators'

const mapStateToProps = (state) => {
    return {
        inputValue: state.todolist.inputValue,
        list: state.todolist.list
        //这里注意,默认写法是state.indexvalue,但是我们把数据拆分开扔进组件文件夹里了额,并在主reducer文件中创建了关联,关联孟子是todolist,所以state.后接todolist.再接数据即可
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _handleInputChange(value) {
            // console.warn('handleinputchange')
            const action = getChangeInputValue(value)
            dispatch(action)
        },
    }
}
```
4. 补充一些问题 注意各个页面之间的文件关系,关联路径
    比如 actionTypes.js actionCreator.js再各个页面之间的关联路径

5. 补充4 ,裂解,actionTypes.js actionCreator.js ,应该随着拆分的reducer.js走,各个组件有各自的文件关系,然后在主reducer.js中进行附reducer.js的整合,就可以实现整体的数据关联关系.

6. 继续优化,可简写路径的代码方式,在小的reducer.js同目录下创建index.is
```js  小reducer.js同目录下的index.js
import todolistReducer from "./reducer";

export { todolistReducer } 
```
```js  主reducer.js文件
import { combineReducers } from "redux";

import {todolistReducer} from "../components/Todolist/store";
//因为小的那边创建了index.js所以就节省下/reducer.js了,在那个index下配置了关联关系
const reducer =  combineReducers({
    todolist:todolistReducer
})

export default reducer
```
7. 更多优化详见本demo todolist组件.