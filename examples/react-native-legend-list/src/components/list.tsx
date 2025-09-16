import type { LegendListRenderItemProps } from "@legendapp/list";
import type { Options } from "@scrolia/react-native";
import type * as React from "react";

import { Scrollbar as S } from "@scrolia/react-native";
import { LegendListY } from "@scrolia/react-native-legend-list";
import { StyleSheet } from "react-native";

type ListProps<T> = Pick<Options, "disabled" | "animated"> & {
    data: T[];
    renderItem: (p: LegendListRenderItemProps<T>) => React.ReactNode;
    estimatedItemSize?: number;
};

const List = <T,>(p: ListProps<T>): React.JSX.Element => {
    return (
        <S.Provider
            disabled={p.disabled}
            animated={p.animated}
        >
            <S.Container style={styles.container}>
                <LegendListY
                    data={p.data}
                    renderItem={p.renderItem}
                    estimatedItemSize={p.estimatedItemSize}
                    recycleItems
                />
                <S.TrackY style={styles.trackY}>
                    <S.ThumbY style={styles.thumbY} />
                </S.TrackY>
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
