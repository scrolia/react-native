"use client";

import type { ViewProps } from "react-native";

import { useScrollCore } from "@scrolia/react-native-core";
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
                <Reanimated.View
                    {...p}
                    ref={p.ref}
                >
                    {children}
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
                {children}
            </View>
        </>
    );
};

export type { ReanimatedTrackYProps };
export { ReanimatedTrackY };
