import React, {useEffect, useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Item} from "../components/listItem";
import {styles} from "../components/style";


export default function ListView({i18n},theme) {

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

//item:


    // Function to add product to favorites.
    async function addToFavorites(landMarkObject)
    {

            let landMarks = await AsyncStorage.getItem('landMarks');
            if (landMarks) {
                landMarks = JSON.parse(landMarks);
                if (landMarkObject in landMarks)
                {

                    return;
                }
                else {
                    landMarks.push(landMarkObject);
                    await AsyncStorage.setItem('landMarks', JSON.stringify(landMarks));
                }

            }
            else
            {
                await AsyncStorage.setItem('landMarks',JSON.stringify(landMarkObject));
            }

    }



    //avtivate marker location aquiëre funtion only once first loaded.
    useEffect(() => {
        getLocations();
    }, []);

    if (!loaded) {
        return (
            <View>
                <Text>
                    {i18n.t('loading')}
                </Text>
            </View>)
    } else {
        return (
            <React.Fragment>
                <Text style={theme === 'l'? styles.title: styles.titleDark}>
                    {i18n.t('overview')}
                </Text>
                <FlatList style={{flex:1}}
                    data={
                    data
                    }
                 renderItem={({item})=> <Item landMarkObject={item} i18n={i18n} />}/>

            </React.Fragment>
        )
    }


}
