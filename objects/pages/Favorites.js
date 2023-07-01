import React, {useEffect, useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function FavoritesView({i18n}) {

    //initialise data
    const [localData, setLocalData] = useState([]);
    const [loaded, setLoaded] = useState(false);



    // Function to load favorites from async storage.
    async function loadFavorites(landMarkObject) {
        let landMarks = await AsyncStorage.getItem('landMarks');
        landMarks = JSON.parse(landMarks)
        setLocalData(landMarks);
        setLoaded(true);
        console.log("loaded landmarks: ",localData)
    }

    //Creates items to show in listview based on localstorage
    const Item = ({landMarkObject}) => (
        <View style={styles.container}>
            <Text>
                {landMarkObject.title.nl}
            </Text>
        </View>
    );




    //load favorites
    useEffect(() => {
        loadFavorites();
    }, []);


    if (!loaded) {
        return (
            <React.Fragment>
                <Text style={styles.title}>
                    {i18n.t("loading")}
                </Text>
            </React.Fragment>
        )
    } else {
        console.log('else loaded...')
        return (

            <React.Fragment>
                <Text style={styles.title}>
                    {i18n.t('FavoritesList')}
                </Text>
                <FlatList
                    data={
                        localData
                    }
                    renderItem={({item}) => <Item landMarkObject={item}/>}/>
            </React.Fragment>
        )
    }

}
const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    safe: {
        flex: 1,
    },
    title: {
        textAlign: "center"
    }
});

