import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  YellowBox,
  ActivityIndicator

} from 'react-native';

import { NetGet } from "../../util/request";
import axios from 'axios'

import TodolistUI from "./TodolistUI";

import store from "../../store";

import {
  getHandleStoreChange,
  getOnChangeData,
  getOpenId,
  initListAction,
  getTodolist,
  getInitList,
} from "../../store/actionCreators";


export default class Todolist extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: Each child in a list should have a unique'
    ])
    let { inputValue, list } = store.getState()
    this.state = {
      inputValue,
      list,
      isShow: true
    }

    store.subscribe(this._handleStoreChange)
  }

  _doRequest = (url) => {
    // console.warn('_dorequest')
    return NetGet(url, null).then(res => {
      // console.warn(res)
      let { status, data } = res
      if (status === 200) {

        console.log(data)
        const action = initListAction(data)
        store.dispatch(action)
      }
      // console.warn(this.state.imgList)
    })


    //thunk 中间件释放
    // const action = getTodolist(url)
    // store.dispatch(action)

  }

  // 封装 request.js使用的 
  // async
  componentDidMount() {
    // axios.get('http://localhost.charlesproxy.com:3000/list.json').then((res) => {
    //   console.log('axios')
    //   console.warn(res)
    // })

    //封装request.js使用的
    // await Promise.all([
    //   this._doRequest('/list.json')
    // ])

    //thunk中间件释放
    // await Promise.all([
    //   this._doRequest('/list.json')
    // ])

    //saga 中间件释放
    const action = getInitList();
    store.dispatch(action)


    this.setState({
      isShow: false
    })

    // console.warn('didmount')

  }

  render() {
    let Loading = (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator animating={this.state.isShow} /></View>
    )
    let PageW = (
      <TodolistUI
        inputValue={this.state.inputValue}
        list={this.state.list}
        _handleInputChange={this._handleInputChange}
        _onChangeData={this._onChangeData}
        _openId={this._openId}
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


  _handleStoreChange = () => {
    this.setState(store.getState())
  }

  _openId = (index) => {
    const action = getOpenId(index)
    store.dispatch(action)
  }

  _handleInputChange = e => {
    const action = getHandleStoreChange(e)
    store.dispatch(action)
  }

  _onChangeData = () => {
    const action = getOnChangeData()
    store.dispatch(action)
  }
}
