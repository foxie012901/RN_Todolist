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
import styles from "./TodolistStyle.js";

import store from "../../store";

import {
  getHandleStoreChange,
  getOnChangeData,
  getOpenId
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

  render() {
    return (
      <View style={styles.content}>
        <View style={{ width: "100%", marginBottom: 10 }}>
          <TextInput
            placeholder={'Write Something...'}
            placeholderTextColor={'#BBBBBB'}
            style={styles.tInput}
            onChangeText={this._handleInputChange}
            value={this.state.inputValue}
          />

          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={this._onChangeData}
          >
            <View style={styles.btnSty}><Text style={styles.btnTxtSty}>Click Me</Text></View>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={({ index }) => { return index }}
          data={this.state.list}
          renderItem={this._renderItem}
          style={{ width: "100%" }}
        />
      </View >
    );
  }

  _renderItem = ({ item, index }) => {
    // console.warn(index)
    return (
      <View style={styles.row}>
        <Text >{item}</Text>
        <TouchableOpacity
          onPress={() => this._openId(index)}
          style={styles.rowTouch}
        >
          <Text style={styles.rowTouchTxt}>delete</Text>
        </TouchableOpacity>
      </View>
    )
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
