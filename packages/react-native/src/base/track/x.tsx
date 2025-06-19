"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type { PointerEvent, ViewProps } from "react-native";

import { styles, useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { StyleSheet, View } from "react-native";

/** Props for the `TrackX` component. */
type TrackXProps = ViewProps;

const Track = (props: TrackXProps, ref: React.Ref<View>): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    const { disabled, headless } = core.options;

    React.useEffect((): void => {
        core.x.setHvTrack(true);
    }, [
        core.x.setHvTrack,
    ]);

    if (disabled) return <></>;

    const handlePointerEnter = (e: PointerEvent): void => {
        core.x.setTrackHover(true);
        p.onPointerEnter?.(e);
    };

    const handlePointerLeave = (e: PointerEvent): void => {
        core.x.setTrackHover(false);
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
                        : StyleSheet.compose(styles.trackX, p.style)
                }
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            >
                {children}
            </View>
        </>
    );
};

/** Horizontal track component. */
const TrackX: React.ForwardRefExoticComponent<
    TrackXProps & React.RefAttributes<View>
> = React.forwardRef(Track);

TrackX.displayName = "TrackX";

export type { TrackXProps };
export { TrackX };
