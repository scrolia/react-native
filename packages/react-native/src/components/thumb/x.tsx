"use client";

import type { ViewProps } from "react-native";

import * as React from "react";
import { Animated, View } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { getComponentProps } from "#/functions/props";
import { useThumbXHandler } from "#/hooks/thumb";

/** Props for the `ThumbX` component. */
type ThumbXProps = ViewProps & {
    ref?: React.Ref<View>;
};

/** Horizontal thumb component. */
const ThumbX = (props: ThumbXProps): React.JSX.Element => {
    const {
        options: { animated, plugins },
        x: { setHvThumb, scrollbarLength, scrollbarOffset },
    } = useScrollCore();

    const p: ThumbXProps = getComponentProps({
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
            <Animated.View
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
            </Animated.View>
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

export type { ThumbXProps };
export { ThumbX };
