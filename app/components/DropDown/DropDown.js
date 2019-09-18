import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';



import styles from "./DropDownStyle";

export default class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowTwo: false,
            isShowThree: false,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> DropDown </Text>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.tab1}
                        onPress={() => (this._clickFun('a'))}
                    >
                        <Text>1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tab2}
                        onPress={() => (this._clickFun('b'))}
                    >
                        <Text>2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.tab3}
                        onPress={() => (this._clickFun('c'))}
                    >
                        <Text>3</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isShowTwo ?
                        (
                            <View style={styles.clickContent}>
                                <TouchableOpacity

                                    onPress={() => (this._clickCloseFun(1, false))}
                                >
                                    <Text style={styles.clickItem}>a1</Text>
                                </TouchableOpacity>


                                <TouchableOpacity

                                    onPress={() => (this._clickCloseFun(2, true))}
                                >
                                    <Text style={styles.clickItem}>a2</Text>
                                </TouchableOpacity>


                                <TouchableOpacity

                                    onPress={() => (this._clickCloseFun(3, false))}
                                >
                                    <Text style={styles.clickItem}>a3</Text>
                                </TouchableOpacity>

                                {
                                    this.state.isShowThree ?
                                        (
                                            <View style={styles.clickContentThree}>
                                                <Text>i am three</Text>
                                            </View>
                                        ) : null
                                }
                            </View>
                        ) : null
                }






            </View>

        );
    }

    _clickFun = e => {
        console.warn(e)
        this.setState({
            isShowTwo: true
        })
    }
    _clickCloseFun = (e, d) => {
        if (d === true) {
            console.warn('three')
            this.setState({
                isShowThree: true
            })
        } else {
            this.setState({
                isShowTwo: false,
            })
        }

    }
}
