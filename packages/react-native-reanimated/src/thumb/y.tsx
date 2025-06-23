"use client";

import type { ViewProps } from "react-native";

import { useScrollCore, useThumbHandlerY } from "@scrolia/react-native-core";
import * as React from "react";
import { View } from "react-native";
import Reanimated from "react-native-reanimated";

/** Props for the `ReanimatedThumbY` component. */
type ReanimatedThumbYProps = ViewProps & {
    ref?: React.Ref<View>;
};

/**
 * Vertical thumb component based on `react-native-reanimated`.
 *
 * **This component requires `react-native-reanimated` to be installed.**
 */
const ReanimatedThumbY = (props: ReanimatedThumbYProps): React.JSX.Element => {
    const { children, ...p } = props;

    const {
        options: { animated },
        y: { setHvThumb, scrollbarLength, scrollbarOffset },
    } = useScrollCore();

    React.useEffect((): void => {
        setHvThumb(true);
    }, [
        setHvThumb,
    ]);

    const { panResponder } = useThumbHandlerY();

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
                            height: Number.isNaN(scrollbarLength)
                                ? 0
                                : scrollbarLength,
                            top: Number.isNaN(scrollbarOffset)
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
                        height: Number.isNaN(scrollbarLength)
                            ? 0
                            : scrollbarLength,
                        top: Number.isNaN(scrollbarOffset)
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

export type { ReanimatedThumbYProps };
export { ReanimatedThumbY };
