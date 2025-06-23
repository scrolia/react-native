import type * as React from "react";

import { StatusBar } from "expo-status-bar";
import { type ListRenderItemInfo, StyleSheet, Text, View } from "react-native";

import { List } from "./components/list";
import { Scrollbar } from "./components/scrollbar";

type Item = {
    id: number;
    name: string;
};

const data: Item[] = Array.from(
    {
        length: 100,
    },
    (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
    }),
);

const ItemComponent = ({
    item,
}: ListRenderItemInfo<Item>): React.JSX.Element => {
    return (
        <View style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
        </View>
    );
};

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
            <View style={styles.block}>
                <List
                    data={data}
                    renderItem={ItemComponent}
                />
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
    item: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        margin: 16,
    },
    text: {
        fontSize: 32,
        fontWeight: "bold",
    },
});
