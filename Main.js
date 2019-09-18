import React, { Component } from "react"
import {
    View,
    Text,
    StyleSheet,
    YellowBox
} from "react-native";


import { Router, Stack, Scene } from "react-native-router-flux";

import App from "./App";
import Todolist from "./app/components/Todolist/Todolist";


export default class Main extends Component {
    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Warning: ViewPagerAndroid has been extracted from react-native'
          ])
        this.state = {}
    }
    render() {
        return (
            <Router>
                <Stack>
                    {/* 配置路由规则 */}
                    {/* 注意，所有的路由规则，都应该写到这个位置 */}
                    {/* 第一个 Scene 就是默认要展示的首页 */}
                    {/* key 属性，表示路由的规则名称，将来可以使用这个 key ，进行编程式导航，每一个路由规则，都应该提供一个 唯一的key， key不能重复 */}
                    <Scene key='app' component={App} title='' hideNavBar={true} />
                    {/* <Scene key='Todolist' component={DecList} title='霸天虎列表页' hideNavBar={false} />
                    <Scene key='details' component={Details} title='英雄介绍' hideNavBar={false} /> */}
                </Stack>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'lightblue'

    }
})