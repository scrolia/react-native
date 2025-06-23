import type { Options } from "@scrolia/react-native";
import type { ListRenderItem } from "@shopify/flash-list";
import type * as React from "react";

import { Scrollbar as S } from "@scrolia/react-native";
import { FlashListY } from "@scrolia/react-native-flash-list";
import { StyleSheet } from "react-native";

type ListProps<T> = Pick<Options, "disabled" | "animated"> & {
    data: T[];
    renderItem: ListRenderItem<T>;
    estimatedItemSize?: number;
};

const List = <T,>(p: ListProps<T>): React.JSX.Element => {
    return (
        <>
            <S.Provider
                disabled={p.disabled}
                animated={p.animated}
            >
                <S.Container style={styles.container}>
                    <FlashListY
                        data={p.data}
                        renderItem={p.renderItem}
                        estimatedItemSize={p.estimatedItemSize}
                    />
                    <S.TrackY style={styles.trackY}>
                        <S.ThumbY style={styles.thumbY} />
                    </S.TrackY>
                </S.Container>
            </S.Provider>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%",
        width: "100%",
    },
    trackY: {
        zIndex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        width: 12,
        height: "100%",
    },
    thumbY: {
        position: "absolute",
        backgroundColor: "#99999955",
        width: 12,
    },
});

export type { ListProps };
export { List };
