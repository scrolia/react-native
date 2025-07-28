"use client";

import type { ViewProps } from "react-native";

import { useScrollCore } from "@scrolia/react-native/contexts/scrollcore";
import { getComponentProps } from "@scrolia/react-native/functions/props";
import { useThumbXHandler } from "@scrolia/react-native/hooks/thumb";
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
    const {
        options: { animated, plugins },
        x: { setHvThumb, scrollbarLength, scrollbarOffset },
    } = useScrollCore();

    const p: ReanimatedThumbXProps = getComponentProps({
        name: "thumbX",
        props,
        plugins,
    });

    React.useEffect((): void => {
        setHvThumb(true);
    }, [
        setHvThumb,
    ]);

    const { panResponder } = useThumbXHandler();

    if (animated) {
        return (
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
                {p.children}
            </Reanimated.View>
        );
    }

    return (
        <View
            {...p}
            {...panResponder.panHandlers}
            ref={p.ref}
            style={[
                p.style,
                {
                    width: Number.isNaN(scrollbarLength) ? 0 : scrollbarLength,
                    left: Number.isNaN(scrollbarOffset) ? 0 : scrollbarOffset,
                },
            ]}
        >
            {p.children}
        </View>
    );
};

export type { ReanimatedThumbXProps };
export { ReanimatedThumbX };
