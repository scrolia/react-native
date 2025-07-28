"use client";

import type { ViewProps } from "react-native";

import * as React from "react";
import { Animated, View } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { getComponentProps } from "#/functions/props";
import { useThumbYHandler } from "#/hooks/thumb";

/** Props for the `ThumbY` component. */
type ThumbYProps = ViewProps & {
    ref?: React.Ref<View>;
};

/** Vertical thumb component. */
const ThumbY = (props: ThumbYProps): React.JSX.Element => {
    const {
        options: { animated, plugins },
        y: { setHvThumb, scrollbarLength, scrollbarOffset },
    } = useScrollCore();

    const p: ThumbYProps = getComponentProps({
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
            <Animated.View
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
                    height: Number.isNaN(scrollbarLength) ? 0 : scrollbarLength,
                    top: Number.isNaN(scrollbarOffset) ? 0 : scrollbarOffset,
                },
            ]}
        >
            {p.children}
        </View>
    );
};

export type { ThumbYProps };
export { ThumbY };
