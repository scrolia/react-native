"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type {
    PanResponderInstance,
    PointerEvent,
    View,
    ViewProps,
} from "react-native";

import { usePanResponderY, useScrollCore } from "@scrolia/react-native-core";
import { UnanimatedThumbY } from "@scrolia/react-native-core-thumb";
import * as React from "react";

import { AnimatedThumbY } from "#/thumb/y/animated";

/** Props for the `ReanimatedThumbY` component. */
type ReanimatedThumbYProps = ViewProps;

const Thumb = (
    props: ReanimatedThumbYProps,
    ref: React.Ref<View>,
): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    const { noAnimation } = core.options;

    const { setHvThumb, setThumbHover } = core.y;

    const panResponderRaw: PanResponderInstance = usePanResponderY();

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
                <UnanimatedThumbY
                    {...p}
                    {...panResponder.panHandlers}
                    ref={ref}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                >
                    {children}
                </UnanimatedThumbY>
            </>
        );
    }

    return (
        <>
            <AnimatedThumbY
                {...p}
                {...panResponder.panHandlers}
                ref={ref}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            >
                {children}
            </AnimatedThumbY>
        </>
    );
};

/**
 * Vertical thumb component based on `react-native-reanimated`.
 *
 * **This component requires `react-native-reanimated` to be installed.**
 */
const ReanimatedThumbY: React.ForwardRefExoticComponent<
    ReanimatedThumbYProps & React.RefAttributes<View>
> = React.forwardRef(Thumb);

ReanimatedThumbY.displayName = "ReanimatedThumbY";

export type { ReanimatedThumbYProps };
export { ReanimatedThumbY };
