import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {black, blue200, white} from "react-native-paper/src/styles/themes/v2/colors";

export default function SettingsView({i18n}) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {i18n.t("settings")}
            </Text>
            <Button style={styles.button}
                    // onPress={englishLangButton}
                    title="English"
                    accessibilityLabel="English language button"
            />

            <Button style={styles.button}
                    // onPress={dutchLangButton}
                    title="Nederlands"
                    accessibilityLabel="Nederlandse taal knop"
            />

            <Button style={styles.button}
                    // onPress={portugueseLangButton}
                    title="Português"
                    accessibilityLabel="Botão de idioma português"
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eaeaea"
    },
    darkText: {
        color: white,
        fontSize: 30
    },
    lightText: {
        color: black,
        fontSize: 30
    },
    button: {
        backgroundColor: blue200
    },
    title: {
        textAlign: "center"
    }
})