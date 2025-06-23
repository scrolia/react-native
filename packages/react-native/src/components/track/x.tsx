"use client";

import type { ViewProps } from "react-native";

import { useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { Animated, View } from "react-native";

/** Props for the `TrackX` component. */
type TrackXProps = ViewProps & {
    ref?: React.Ref<View>;
};

/** Horizontal track component. */
const TrackX = (props: TrackXProps): React.JSX.Element => {
    const { children, ...p } = props;

    const {
        options: { disabled, animated },
        x: { setHvTrack },
    } = useScrollCore();

    React.useEffect((): void => {
        setHvTrack(true);
    }, [
        setHvTrack,
    ]);

    if (disabled) return <></>;

    if (animated) {
        return (
            <>
                <Animated.View
                    {...p}
                    ref={p.ref}
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
                ref={p.ref}
            >
                {children}
            </View>
        </>
    );
};

export type { TrackXProps };
export { TrackX };
