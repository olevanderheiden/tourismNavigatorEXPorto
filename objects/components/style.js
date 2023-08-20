import {Platform, StyleSheet} from "react-native";
import {black, blue100, blue900, white} from "react-native-paper/src/styles/themes/v2/colors";
export const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerDark: {
        flex: 1,

        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navContainer: {
        flex: 1,
        backgroundColor: blue100,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        height: '100%'
    },
    navContainerDark: {
        flex: 1,
        backgroundColor: blue900,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        height: '100%'
    },
    barStyle:{
        backgroundColor: blue100
    },
    barStyleDark:{
        backgroundColor: blue900,
    },
    screen: {
        marginTop: 30,
    },
    row: {
        alignContent: "center",
        margin: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 2,
    },
    rowText: {
        fontSize: 10,
    },

    title: {
        textAlign: "center",
        color:black,
        backgroundColor: blue100
    },
    titleDark:{
      textAlign:"center",
        color:white,
      backgroundColor:blue900
    },
    itemStyle:{
        alignSelf:"center",
        width: "40%",
        marginTop: 16,
        paddingVertical:8,
        borderWidth: 1,
        borderColor:'#2032a',
        borderRadius:1,
        // backgroundColor:'#61dafb',
        color:'#20232a',
        textAlign:"center",
        fontSize:13,
        // fontWeight:'bold',
        overflow:"hidden"

    },
    itemStyleDark:{
        alignSelf:"center",
        width: "40%",
        marginTop: 16,
        paddingVertical:8,
        borderWidth: 1,
        borderColor:'#FFF',
        borderRadius:1,
        // backgroundColor:'#61dafb',
        color:'#FFF',
        textAlign:"center",
        fontSize:13,
        // fontWeight:'bold',
        overflow:"hidden"

    },
    map: {
        width: '100%',
        height: '100%',

    },
    inactive:{
        color:black,
    },
    inactiveDark:{
        color: white,
    },
    safe: {
        flex: 1,
    },

    mapStyle:{
        backgroundColor: white,
    },

    safeAreaView:{
        flex: 1,
        backgroundColor: blue100,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        height: '100%'
    },
    safeAreaViewDark:{
        flex: 1,
        backgroundColor: blue900,
        paddingTop: Platform.OS === 'android' ? 30 : 0,
        height: '100%'
    },
    mapStyleDark:{
        backgroundColor:black,
    }

})