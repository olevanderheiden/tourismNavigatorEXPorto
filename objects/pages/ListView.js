import React, {useEffect, useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ListView({i18n}) {

    //aquire marker locations from api
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const getLocations = async () => {
        try {
            const response = await fetch('https://stud.hosted.hr.nl/1034047/api2.json');
            const json = await response.json();
            setData(json['items']);
            setLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };

    //Creates items to show in listview based on api data
    const Item = ({landMarkObject}) => (
        <View style={styles.container}>
            <Pressable onPress={() => addToFavorites(landMarkObject)}>
            <Text style={styles.button}>{landMarkObject.title.nl}</Text>
            </Pressable>
        </View>
    );

    // Function to add product to favorites.
    async function addToFavorites(landMarkObject)
    {

            let landMarks = await AsyncStorage.getItem('landMarks');
            console.log("Landmarks before update: ",landMarks);
            if (landMarks) {
                landMarks = JSON.parse(landMarks);
                if (landMarkObject in landMarks)
                {
                    console.log('already exists in favorites')
                    return;
                }
                else {
                    landMarks.push(landMarkObject);
                    await AsyncStorage.setItem('landMarks', JSON.stringify(landMarks));
                    console.log('landMarks updated');
                }

            }
            else
            {
                console.log("LandMark created");
                await AsyncStorage.setItem('landMarks',JSON.stringify(landMarkObject));
            }

    }



    //avtivate marker location aquiëre funtion only once first loaded.
    useEffect(() => {
        getLocations();
    }, []);

    if (!loaded) {
        console.log('loading')
        return (
            <View>
                <Text>
                    {i18n.t('loading')}
                </Text>
            </View>)
    } else {
        return (
            <React.Fragment>
                <Text style={styles.title}>
                    {i18n.t('overview')}
                </Text>
                <FlatList style={{flex:1}}
                    data={
                    data
                    }
                 renderItem={({item})=> <Item landMarkObject={item} />}/>

            </React.Fragment>
        )
    }


}

const styles = StyleSheet.create({
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
    button:{
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
    title: {
        textAlign: "center"
    }
})