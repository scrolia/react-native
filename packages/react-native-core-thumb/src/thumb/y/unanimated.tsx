"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type { ViewProps } from "react-native";

import { styles, useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { View } from "react-native";

type UnanimatedThumbYProps = ViewProps;

const Thumb = (
    props: UnanimatedThumbYProps,
    ref: React.Ref<View>,
): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    const { headless } = core.options;

    const {
        options: { thumbColor },
        isActive,
        trackHover,
        thumbHover,
        drag,
        scrollbarLength,
        scrollbarOffset,
    } = core.y;

    const [opacity, setOpacity] = React.useState<number>(0);
    const [backgroundColor, setBackgroundColor] = React.useState<string>(
        thumbColor.base,
    );

    React.useEffect((): void => {
        setOpacity(isActive || trackHover || thumbHover ? 1 : 0);
    }, [
        isActive,
        trackHover,
        thumbHover,
    ]);

    React.useEffect((): void => {
        setBackgroundColor(
            drag
                ? thumbColor.press
                : thumbHover
                  ? thumbColor.hover
                  : thumbColor.base,
        );
    }, [
        drag,
        thumbHover,
        thumbColor,
    ]);

    return (
        <>
            <View
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
            </View>
        </>
    );
};

const UnanimatedThumbY: React.ForwardRefExoticComponent<
    UnanimatedThumbYProps & React.RefAttributes<View>
> = React.forwardRef(Thumb);

UnanimatedThumbY.displayName = "UnanimatedThumbY";

export type { UnanimatedThumbYProps };
export { UnanimatedThumbY };
