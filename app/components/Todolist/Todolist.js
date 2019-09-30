import React, { Component } from 'react';
import {
    View,
    Text,
    YellowBox,
    ActivityIndicator

} from 'react-native';

import TodolistUI from './TodolistUI'
// import {
//     getChangeInputValue,
//     InitList,
//     delInitListIndex,
//     putDataToList
// } from "./store/actionCreators";

import { actionCreators } from "./store";

import { connect } from "react-redux";

class Todolist extends Component {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings([
            'Warning: Each child in a list should have a unique'
        ])
        this.state = {
            isShow: true
        };
    }

    componentDidMount() {
        //流程: 通过_getdata里的putDataToList,dispatch给store,saga下拦截到,
        //执行里面的getData,在actionCreator下获取接口数据并赋值给data,
        //然后dispatch给action,reducer进行条件处理,传递个store
        this.props._getData()
        this.setState({
            isShow: false
        })
    }
    render() {
        let Loading = (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator animating={this.state.isShow} /></View>
        )
        let PageW = (
            <TodolistUI
                inputValue={this.props.inputValue}
                list={this.props.list}
                _handleInputChange={this.props._handleInputChange}
                _handleInitList={this.props._handleInitList}
                _handleDelList={this.props._handleDelList}
            />
        )
        return (
            <View style={{ width: '100%', height: '100%' }}>
                {
                    this.state.isShow ? Loading : PageW
                }
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    // console.warn(typeof(state.todolist.get('list')))
    // console.warn(typeof(state.todolist.get('list').toJS()))
    return {
        inputValue: state.todolist.get('inputValue'),
        list: state.todolist.get('list').toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _handleInputChange(value) {
            // console.warn('handleinputchange')
            // const action = getChangeInputValue(value)
            dispatch(actionCreators.getChangeInputValue(value))
        },
        _handleInitList() {
            // console.warn('1111')
            const action = actionCreators.InitList()
            dispatch(action)
        },
        _handleDelList(index) {
            const action = actionCreators.delInitListIndex(index)
            dispatch(action)
        },
        _getData() {
            // console.warn('put data')
            const action = actionCreators.putDataToList()
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist)
