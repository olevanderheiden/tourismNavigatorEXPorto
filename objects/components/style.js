import {Platform, StyleSheet} from "react-native";
import {blue100, blue900} from "react-native-paper/src/styles/themes/v2/colors";
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
        textAlign: "center"
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
    map: {
        width: '100%',
        height: '100%',
    },
    safe: {
        flex: 1,
    },
})