import React,{Component  } from "react"
import { 
    View,
    Text,
    StyleSheet,
 } from "react-native";

import Todolist from "./app/components/Todolist/Todolist";

 export default class Main extends Component{
     constructor(props){
         super(props)
         this.state={}
     }
     render(){
         return (
             <View style={styles.container}>
                 <Todolist />
             </View>
         )
     }
 }

 const styles = StyleSheet.create({
     container:{
        width:'100%',
        height:'100%',
        backgroundColor:'lightblue'

     }
 })