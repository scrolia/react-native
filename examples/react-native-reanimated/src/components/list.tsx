import type { Options } from "@scrolia/react-native";
import type * as React from "react";
import type { ListRenderItem } from "react-native";

import { Scrollbar as S } from "@scrolia/react-native";
import {
    ReanimatedThumbY,
    ReanimatedTrackY,
} from "@scrolia/react-native-reanimated";
import { StyleSheet } from "react-native";

type ListProps<T> = Pick<Options, "disabled" | "animated"> & {
    data: ArrayLike<T>;
    renderItem: ListRenderItem<T>;
};

const List = <T,>(p: ListProps<T>): React.JSX.Element => {
    return (
        <S.Provider
            disabled={p.disabled}
            animated={p.animated}
        >
            <S.Container style={styles.container}>
                <S.ListY
                    data={p.data}
                    renderItem={p.renderItem}
                />
                <ReanimatedTrackY style={styles.trackY}>
                    <ReanimatedThumbY style={styles.thumbY} />
                </ReanimatedTrackY>
            </S.Container>
        </S.Provider>
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
