"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type { View, ViewProps } from "react-native";

import { styles, useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { Animated } from "react-native";

type AnimatedThumbXProps = ViewProps;

const Thumb = (
    props: AnimatedThumbXProps,
    ref: React.Ref<View>,
): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    const { headless, useNativeDriver } = core.options;

    const {
        options: { thumbColor },
        isActive,
        trackHover,
        thumbHover,
        drag,
        scrollbarLength,
        scrollbarOffset,
    } = core.x;

    const opacity: Animated.Value = React.useRef(new Animated.Value(0)).current;
    const backgroundColorRaw: Animated.Value = React.useRef(
        new Animated.Value(0),
    ).current;

    const backgroundColor: Animated.AnimatedInterpolation<string> =
        backgroundColorRaw.interpolate({
            inputRange: [
                0,
                1,
                2,
            ],
            outputRange: [
                thumbColor.base,
                thumbColor.hover,
                thumbColor.press,
            ],
        });

    React.useEffect((): void => {
        Animated.timing(opacity, {
            toValue: isActive || trackHover || thumbHover ? 1 : 0,
            useNativeDriver,
            duration: 200,
        }).start();
    }, [
        isActive,
        trackHover,
        thumbHover,
        opacity,
        useNativeDriver,
    ]);

    React.useEffect((): void => {
        Animated.timing(backgroundColorRaw, {
            toValue: drag ? 2 : thumbHover ? 1 : 0,
            useNativeDriver,
            duration: 200,
        }).start();
    }, [
        drag,
        thumbHover,
        useNativeDriver,
        backgroundColorRaw,
    ]);

    return (
        <>
            <Animated.View
                {...p}
                ref={ref}
                style={[
                    !headless && styles.thumbX,
                    p.style,
                    {
                        width: Number.isNaN(scrollbarLength)
                            ? 0
                            : scrollbarLength,
                        left: Number.isNaN(scrollbarOffset)
                            ? 0
                            : scrollbarOffset,
                    },
                    !headless && {
                        opacity,
                        backgroundColor,
                    },
                ]}
            >
                {children}
            </Animated.View>
        </>
    );
};

const AnimatedThumbX: React.ForwardRefExoticComponent<
    AnimatedThumbXProps & React.RefAttributes<View>
> = React.forwardRef(Thumb);

AnimatedThumbX.displayName = "AnimatedThumbX";

export type { AnimatedThumbXProps };
export { AnimatedThumbX };
