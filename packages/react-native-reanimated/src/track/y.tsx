"use client";

import type { ViewProps } from "react-native";

import { getComponentProps, useScrollCore } from "@scrolia/react-native";
import * as React from "react";
import { View } from "react-native";
import Reanimated from "react-native-reanimated";

/** Props for the `ReanimatedTrackY` component. */
type ReanimatedTrackYProps = ViewProps & {
    ref?: React.Ref<View>;
};

/**
 * Vertical track component based on `react-native-reanimated`.
 *
 * **This component requires `react-native-reanimated` to be installed.**
 */
const ReanimatedTrackY = (props: ReanimatedTrackYProps): React.JSX.Element => {
    const {
        options: { disabled, animated, plugins },
        x: { setHvTrack },
    } = useScrollCore();

    const p: ReanimatedTrackYProps = getComponentProps({
        name: "trackY",
        props,
        plugins,
    });

    React.useEffect((): void => {
        setHvTrack(true);
    }, [
        setHvTrack,
    ]);

    if (disabled) return <></>;

    if (animated) {
        return (
            <>
                <Reanimated.View
                    {...p}
                    ref={p.ref}
                >
                    {p.children}
                </Reanimated.View>
            </>
        );
    }

    return (
        <>
            <View
                {...p}
                ref={p.ref}
            >
                {p.children}
            </View>
        </>
    );
};

export type { ReanimatedTrackYProps };
export { ReanimatedTrackY };
