"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type { PointerEvent, ViewProps } from "react-native";

import { styles, useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { StyleSheet, View } from "react-native";

/** Props for the `TrackY` component. */
type TrackYProps = ViewProps;

const Track = (props: TrackYProps, ref: React.Ref<View>): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    const { disabled, headless } = core.options;

    React.useEffect((): void => {
        core.y.setHvTrack(true);
    }, [
        core.y.setHvTrack,
    ]);

    if (disabled) return <></>;

    const handlePointerEnter = (e: PointerEvent): void => {
        core.y.setTrackHover(true);
        p.onPointerEnter?.(e);
    };

    const handlePointerLeave = (e: PointerEvent): void => {
        core.y.setTrackHover(false);
        p.onPointerLeave?.(e);
    };

    return (
        <>
            <View
                {...p}
                ref={ref}
                style={
                    headless
                        ? p.style
                        : StyleSheet.compose(styles.trackY, p.style)
                }
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            >
                {children}
            </View>
        </>
    );
};

/** Vertical track component. */
const TrackY: React.ForwardRefExoticComponent<
    TrackYProps & React.RefAttributes<View>
> = React.forwardRef(Track);

TrackY.displayName = "TrackY";

export type { TrackYProps };
export { TrackY };
