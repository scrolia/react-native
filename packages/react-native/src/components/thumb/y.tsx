"use client";

import type { ViewProps } from "react-native";

import * as React from "react";
import { Animated, View } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { useThumbHandlerY } from "#/hooks/thumb/y";

/** Props for the `ThumbY` component. */
type ThumbYProps = ViewProps & {
    ref?: React.Ref<View>;
};

/** Vertical thumb component. */
const ThumbY = (props: ThumbYProps): React.JSX.Element => {
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

export type { ThumbYProps };
export { ThumbY };
