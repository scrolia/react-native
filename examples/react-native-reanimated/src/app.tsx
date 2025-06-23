import type * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Scrollbar } from "./components/scrollbar";

export default (): React.JSX.Element => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.block}>
                <Scrollbar>
                    <View style={styles.subBlock}>
                        <Text>Block</Text>
                    </View>
                </Scrollbar>
            </View>
            <View style={styles.block}>
                <Scrollbar>
                    <View style={styles.subVBlock}>
                        <Text>Vertical Block</Text>
                    </View>
                </Scrollbar>
            </View>
            <View style={styles.block}>
                <Scrollbar>
                    <View style={styles.subHBlock}>
                        <Text>Horizontal Block</Text>
                    </View>
                </Scrollbar>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    block: {
        width: 200,
        height: 200,
        borderColor: "black",
        borderWidth: 1,
    },
    subBlock: {
        width: 600,
        height: 600,
    },
    subVBlock: {
        width: 200 - 2,
        height: 600,
    },
    subHBlock: {
        width: 600,
        height: 200 - 2,
    },
});
