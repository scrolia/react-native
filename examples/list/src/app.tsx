import type * as React from "react";
import type { ListRenderItemInfo } from "react-native";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { List } from "./components/list";

type Item = {
    id: number;
    name: string;
};

const data: Item[] = [
    {
        id: 1,
        name: "Item 1",
    },
    {
        id: 2,
        name: "Item 2",
    },
    {
        id: 3,
        name: "Item 3",
    },
    {
        id: 4,
        name: "Item 4",
    },
    {
        id: 5,
        name: "Item 5",
    },
    {
        id: 6,
        name: "Item 6",
    },
    {
        id: 7,
        name: "Item 7",
    },
    {
        id: 8,
        name: "Item 8",
    },
    {
        id: 9,
        name: "Item 9",
    },
    {
        id: 10,
        name: "Item 10",
    },
];

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
            <List
                data={data}
                renderItem={ItemComponent}
            />
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
    item: {
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        margin: 10,
    },
    text: {
        fontSize: 32,
        fontWeight: "bold",
    },
});
