import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  YellowBox

} from 'react-native';

import { NetGet } from "../../util/request";
import axios from 'axios'

import TodolistUI from "./TodolistUI";

import store from "../../store";

import {
  getHandleStoreChange,
  getOnChangeData,
  getOpenId,
  initListAction
} from "../../store/actionCreators";


export default class Todolist extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: Each child in a list should have a unique'
    ])
    this.state = store.getState()

    store.subscribe(this._handleStoreChange)
  }

  _doRequest = (url) => {
    // console.warn('_dorequest')
    return NetGet(url, null).then(res => {
      // console.warn(res)
      let { status, data } = res
      if (status === 200) {

        // console.warn(data)
        const action = initListAction(data)
        store.dispatch(action)
      }
      // console.warn(this.state.imgList)
    })
  }

  async componentDidMount() {

    // axios.get('http://localhost.charlesproxy.com:3000/list.json').then((res) => {
    //   console.log('axios')
    //   console.warn(res)
    // })
    await Promise.all([
      this._doRequest('/list.json')
    ])
    // console.warn('didmount')

  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <TodolistUI
          inputValue={this.state.inputValue}
          list={this.state.list}
          _handleInputChange={this._handleInputChange}
          _onChangeData={this._onChangeData}
          _openId={this._openId}
        />
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
