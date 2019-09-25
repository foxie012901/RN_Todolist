import React, { Component } from 'react';
import {
    View,
    Text,
    YellowBox,
    ActivityIndicator

} from 'react-native';

import TodolistUI from './TodolistUI'
import {
    getChangeInputValue,
    InitList,
    delInitListIndex,
    getData,
    putDataToList
} from "../../store/actionCreators";

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
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _handleInputChange(value) {
            const action = getChangeInputValue(value)
            dispatch(action)
        },
        _handleInitList() {
            // console.warn('1111')
            const action = InitList()
            dispatch(action)
        },
        _handleDelList(index) {
            const action = delInitListIndex(index)
            dispatch(action)
        },
        _getData(){
            console.warn('put data')
            const action = putDataToList()
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist)
