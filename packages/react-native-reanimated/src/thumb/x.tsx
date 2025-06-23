"use client";

import type { ViewProps } from "react-native";

import { useScrollCore, useThumbHandlerX } from "@scrolia/react-native-core";
import * as React from "react";
import { View } from "react-native";
import Reanimated from "react-native-reanimated";

/** Props for the `ReanimatedThumbX` component. */
type ReanimatedThumbXProps = ViewProps & {
    ref?: React.Ref<View>;
};

/**
 * Horizontal thumb component based on `react-native-reanimated`.
 *
 * **This component requires `react-native-reanimated` to be installed.**
 */
const ReanimatedThumbX = (props: ReanimatedThumbXProps): React.JSX.Element => {
    const { children, ...p } = props;

    const {
        options: { animated },
        x: { setHvThumb, scrollbarLength, scrollbarOffset },
    } = useScrollCore();

    React.useEffect((): void => {
        setHvThumb(true);
    }, [
        setHvThumb,
    ]);

    const { panResponder } = useThumbHandlerX();

    if (animated) {
        return (
            <>
                <Reanimated.View
                    {...p}
                    {...panResponder.panHandlers}
                    ref={p.ref}
                    style={[
                        p.style,
                        {
                            width: Number.isNaN(scrollbarLength)
                                ? 0
                                : scrollbarLength,
                            left: Number.isNaN(scrollbarOffset)
                                ? 0
                                : scrollbarOffset,
                        },
                    ]}
                >
                    {children}
                </Reanimated.View>
            </>
        );
    }

    return (
        <>
            <View
                {...p}
                {...panResponder.panHandlers}
                ref={p.ref}
                style={[
                    p.style,
                    {
                        width: Number.isNaN(scrollbarLength)
                            ? 0
                            : scrollbarLength,
                        left: Number.isNaN(scrollbarOffset)
                            ? 0
                            : scrollbarOffset,
                    },
                ]}
            >
                {children}
            </View>
        </>
    );
};

export type { ReanimatedThumbXProps };
export { ReanimatedThumbX };
