"use client";

import type { ViewProps } from "react-native";

import * as React from "react";
import { Animated, View } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";

/** Props for the `TrackY` component. */
type TrackYProps = ViewProps & {
    ref?: React.Ref<View>;
};

/** Vertical track component. */
const TrackY = (props: TrackYProps): React.JSX.Element => {
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

export type { TrackYProps };
export { TrackY };
