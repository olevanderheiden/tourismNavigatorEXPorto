import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {black, blue200, white} from "react-native-paper/src/styles/themes/v2/colors";
import { Col, Row, Grid } from "react-native-easy-grid";
import {Title} from "react-native-paper";
import title from "react-native-paper/src/components/Typography/v2/Title";
import {styles} from "../components/style";

export default function SettingsView({i18n}, lang, setLang) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {i18n.t("settings")}
            </Text>

            <Grid>
                <Col>
                    <Button style={styles.button}
                        onPress={setLang('en')}
                            title="English"
                            accessibilityLabel="English language button"
                    />
                </Col>

                <Col>
                    <Button style={styles.button}
                        onPress={setLang('nl')}
                            title="Nederlands"
                            accessibilityLabel="Nederlandse taal knop"
                    />
                </Col>
                <Col>
                    <Button style={styles.button}
                        onPress={setLang('pt')}
                            title="Português"
                            accessibilityLabel="Botão de idioma português"
                    />
                </Col>
            </Grid>







        </View>
    )
}
