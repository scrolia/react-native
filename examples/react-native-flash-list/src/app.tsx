import type { ListRenderItemInfo } from "@shopify/flash-list";
import type * as React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { List } from "./components/list";

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
            <List
                data={data}
                renderItem={ItemComponent}
                estimatedItemSize={220}
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
        margin: 16,
    },
    text: {
        fontSize: 32,
        fontWeight: "bold",
    },
});
