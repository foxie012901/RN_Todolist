import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    content: {
        flex: 1,
        width: "100%",
        padding: 10,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "lightblue",
        paddingTop: 50,
    },
    tInput: {
        width: "100%",
        height: 33,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
    },
    row: {
        fontSize: 24,
        padding: 42,
        borderWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        position: 'relative'
    },
    btnSty: {
        width: '100%',
        height: 33,
        lineHeight: 33,
        backgroundColor: "#841584",
        alignItems: 'center',
    },
    btnTxtSty: {
        fontSize: 16,
        lineHeight: 33,
        color: "#fff",
    },
    rowTouch: {
        width: 60,
        height: 33,
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    rowTouchTxt: {
        fontSize: 14,
        color: "#fff",
    }
})