import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import styles from "./PickerThreeStyle";

import DropdownMenu from 'react-native-dropdown-menu';




export default class PickerThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:''
    };
  }

  render() {
    var data = [["C", "Java", "JavaScript", "PHP"], ["请先选择类型"], ["请先选择类型"]];
    return (
      <View style={styles.container}>
        <Text> PickerThree </Text>

        
        <View style={{ height: 64 }} />
        <DropdownMenu
          style={{ flex: 1 }}
          bgColor={'white'}
          tintColor={'#666666'}
          activityTintColor={'green'}
          // arrowImg={}      
          // checkImage={}   
          // optionTextStyle={{color: '#333333'}}
          // titleStyle={{color: '#333333'}} 
          // maxHeight={300} 
          data={data}
          handler={(selection, row) => this.setState({ text: data[selection][row] })}
          
        >

          <View style={{ flex: 1 }}>
            <Text>
              {this.state.text} is the best language in the world
            </Text>
          </View>

        </DropdownMenu>
      </View>
    );
  }
}
