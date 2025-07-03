import type { Options } from "@scrolia/react-native";
import type * as React from "react";

import { Scrollbar as S } from "@scrolia/react-native";
import {
    ReanimatedThumbX,
    ReanimatedThumbY,
    ReanimatedTrackX,
    ReanimatedTrackY,
} from "@scrolia/react-native-reanimated";
import { StyleSheet } from "react-native";

type ScrollbarProps = Pick<Options, "disabled" | "animated"> & {
    children?: React.ReactNode;
};

const Scrollbar = (props: ScrollbarProps): React.JSX.Element => {
    const { children, ...p } = props;

    return (
        <S.Provider
            disabled={p.disabled}
            animated={true}
        >
            <S.Container style={styles.container}>
                <S.ContentX>
                    <S.ContentY>{children}</S.ContentY>
                </S.ContentX>
                <ReanimatedTrackX style={styles.trackX}>
                    <ReanimatedThumbX style={styles.thumbX} />
                </ReanimatedTrackX>
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
    trackX: {
        zIndex: 1,
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: 12,
    },
    trackY: {
        zIndex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        width: 12,
        height: "100%",
    },
    thumbX: {
        position: "absolute",
        backgroundColor: "#99999955",
        height: 12,
    },
    thumbY: {
        position: "absolute",
        backgroundColor: "#99999955",
        width: 12,
    },
});

export type { ScrollbarProps };
export { Scrollbar };
