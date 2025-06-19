"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type {
    PanResponderInstance,
    PointerEvent,
    View,
    ViewProps,
} from "react-native";

import { usePanResponderX, useScrollCore } from "@scrolia/react-native-core";
import { UnanimatedThumbX } from "@scrolia/react-native-core-thumb";
import * as React from "react";

import { AnimatedThumbX } from "#/thumb/x/animated";

/** Props for the `ReanimatedThumbX` component. */
type ReanimatedThumbXProps = ViewProps;

const Thumb = (
    props: ReanimatedThumbXProps,
    ref: React.Ref<View>,
): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    const { noAnimation } = core.options;

    const { setHvThumb, setThumbHover } = core.x;

    const panResponderRaw: PanResponderInstance = usePanResponderX();

    React.useEffect((): void => {
        setHvThumb(true);
    }, [
        setHvThumb,
    ]);

    const panResponder: PanResponderInstance =
        React.useRef(panResponderRaw).current;

    const handlePointerEnter = (e: PointerEvent): void => {
        setThumbHover(true);
        p.onPointerEnter?.(e);
    };

    const handlePointerLeave = (e: PointerEvent): void => {
        setThumbHover(false);
        p.onPointerLeave?.(e);
    };

    if (noAnimation) {
        return (
            <>
                <UnanimatedThumbX
                    {...p}
                    {...panResponder.panHandlers}
                    ref={ref}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                >
                    {children}
                </UnanimatedThumbX>
            </>
        );
    }

    return (
        <>
            <AnimatedThumbX
                {...p}
                {...panResponder.panHandlers}
                ref={ref}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            >
                {children}
            </AnimatedThumbX>
        </>
    );
};

/**
 * Horizontal thumb component based on `react-native-reanimated`.
 *
 * **This component requires `react-native-reanimated` to be installed.**
 */
const ReanimatedThumbX: React.ForwardRefExoticComponent<
    ReanimatedThumbXProps & React.RefAttributes<View>
> = React.forwardRef(Thumb);

ReanimatedThumbX.displayName = "ReanimatedThumbX";

export type { ReanimatedThumbXProps };
export { ReanimatedThumbX };
