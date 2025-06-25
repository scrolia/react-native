"use client";

import type { ViewProps } from "react-native";

import * as React from "react";
import { Animated, View } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { useThumbHandlerX } from "#/hooks/thumb/x";

/** Props for the `ThumbX` component. */
type ThumbXProps = ViewProps & {
    ref?: React.Ref<View>;
};

/** Horizontal thumb component. */
const ThumbX = (props: ThumbXProps): React.JSX.Element => {
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
                    {children}
                </Animated.View>
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

export type { ThumbXProps };
export { ThumbX };
