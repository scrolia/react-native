"use client";

import type { ViewProps } from "react-native";

import { useScrollCore } from "@scrolia/react-native/contexts/scrollcore";
import { getComponentProps } from "@scrolia/react-native/functions/props";
import * as React from "react";
import { View } from "react-native";
import Reanimated from "react-native-reanimated";

/** Props for the `ReanimatedTrackX` component. */
type ReanimatedTrackXProps = ViewProps & {
    ref?: React.Ref<View>;
};

/**
 * Horizontal track component based on `react-native-reanimated`.
 *
 * **This component requires `react-native-reanimated` to be installed.**
 */
const ReanimatedTrackX = (props: ReanimatedTrackXProps): React.JSX.Element => {
    const {
        options: { disabled, animated, plugins },
        x: { setHvTrack },
    } = useScrollCore();

    const p: ReanimatedTrackXProps = getComponentProps({
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
            <Reanimated.View
                {...p}
                ref={p.ref}
            >
                {p.children}
            </Reanimated.View>
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

export type { ReanimatedTrackXProps };
export { ReanimatedTrackX };
