"use client";

import type { ViewProps } from "react-native";

import * as React from "react";
import { Animated, View } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { getComponentProps } from "#/functions/props";

/** Props for the `TrackX` component. */
type TrackXProps = ViewProps & {
    ref?: React.Ref<View>;
};

/** Horizontal track component. */
const TrackX = (props: TrackXProps): React.JSX.Element => {
    const {
        options: { disabled, animated, plugins },
        x: { setHvTrack },
    } = useScrollCore();

    const p: TrackXProps = getComponentProps({
        name: "trackX",
        props,
        plugins,
    });

    React.useEffect((): void => {
        setHvTrack(true);
    }, [
        setHvTrack,
    ]);

    if (disabled) return <>{}</>;

    if (animated) {
        return (
            <Animated.View
                {...p}
                ref={p.ref}
            >
                {p.children}
            </Animated.View>
        );
    }

    return (
        <View
            {...p}
            ref={p.ref}
        >
            {p.children}
        </View>
    );
};

export type { TrackXProps };
export { TrackX };
