"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type {
    PanResponderInstance,
    PointerEvent,
    View,
    ViewProps,
} from "react-native";

import { usePanResponderX, useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";

import { AnimatedThumbX } from "#/thumb/x/animated";
import { UnanimatedThumbX } from "#/thumb/x/unanimated";

/** Props for the `ThumbX` component. */
type ThumbXProps = ViewProps;

const Thumb = (props: ThumbXProps, ref: React.Ref<View>): React.JSX.Element => {
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

/** Horizontal thumb component. */
const ThumbX: React.ForwardRefExoticComponent<
    ThumbXProps & React.RefAttributes<View>
> = React.forwardRef(Thumb);

ThumbX.displayName = "ThumbX";

export type { ThumbXProps };
export { ThumbX };
