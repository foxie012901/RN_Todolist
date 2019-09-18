import { StyleSheet, Dimensions } from "react-native";
import { gray } from "ansi-colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'lightblue',
        paddingTop:55
    },
    content:{
        height:55,
        width:'100%',
        backgroundColor:'#fff',
        flexDirection:'row',
    },
    tab1:{
        width:'33.33%',
        backgroundColor:"#f00",
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    tab2:{
        width:'33.34%',
        backgroundColor:"#0f0",
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    tab3:{
        width:'33.33%',
        backgroundColor:"#00f",
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    clickContent:{
        width:'100%',
        height:200,
        backgroundColor:'white',
        position: 'relative',

    },
    clickItem:{
        width:'100%',
        height:33,
        lineHeight:33,
        backgroundColor:'#f1f1f1',
        marginTop:5,
        marginBottom:5,
    },
    clickContentThree:{
        height:200,
        width:"50%",
        zIndex:999,
        position: "absolute",
        right:0,
        backgroundColor:'gray'
    }
})