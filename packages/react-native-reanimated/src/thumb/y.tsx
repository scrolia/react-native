"use client";

import type { ViewProps } from "react-native";

import { useScrollCore } from "@scrolia/react-native/contexts/scrollcore";
import { getComponentProps } from "@scrolia/react-native/functions/props";
import { useThumbYHandler } from "@scrolia/react-native/hooks/thumb";
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
    const {
        options: { animated, plugins },
        y: { setHvThumb, scrollbarLength, scrollbarOffset },
    } = useScrollCore();

    const p: ReanimatedThumbYProps = getComponentProps({
        name: "thumbY",
        props,
        plugins,
    });

    React.useEffect((): void => {
        setHvThumb(true);
    }, [
        setHvThumb,
    ]);

    const { panResponder } = useThumbYHandler();

    if (animated) {
        return (
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
                    height: Number.isNaN(scrollbarLength) ? 0 : scrollbarLength,
                    top: Number.isNaN(scrollbarOffset) ? 0 : scrollbarOffset,
                },
            ]}
        >
            {p.children}
        </View>
    );
};

export type { ReanimatedThumbYProps };
export { ReanimatedThumbY };
