"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type { View, ViewProps } from "react-native";

import { styles, useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { Animated } from "react-native";

type AnimatedThumbYProps = ViewProps;

const Thumb = (
    props: AnimatedThumbYProps,
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
    } = core.y;

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
                    !headless && styles.thumbY,
                    p.style,
                    {
                        height: Number.isNaN(scrollbarLength)
                            ? 0
                            : scrollbarLength,
                        top: Number.isNaN(scrollbarOffset)
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

const AnimatedThumbY: React.ForwardRefExoticComponent<
    AnimatedThumbYProps & React.RefAttributes<View>
> = React.forwardRef(Thumb);

AnimatedThumbY.displayName = "AnimatedThumbX";

export type { AnimatedThumbYProps };
export { AnimatedThumbY };
