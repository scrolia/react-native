"use client";

import type { Options } from "@scrolia/react-native-core";
import type { ViewProps } from "react-native";

import { ScrollCoreProvider, styles } from "@scrolia/react-native-core";
import * as React from "react";
import { StyleSheet, View } from "react-native";

/** Props for the `Container` component. */
type ContainerProps = Options & ViewProps;

const _Container = (
    props: ContainerProps,
    ref: React.Ref<View>,
): React.JSX.Element => {
    const {
        disabled,
        headless,
        noAnimation,
        useNativeDriver,
        thumbColor,
        setScrollbarLength,
        x,
        y,
        ...p
    } = props;

    return (
        <>
            <ScrollCoreProvider
                options={{
                    disabled,
                    headless,
                    noAnimation,
                    useNativeDriver,
                    thumbColor,
                    setScrollbarLength,
                    x,
                    y,
                }}
            >
                <View
                    {...p}
                    ref={ref}
                    style={
                        headless
                            ? p.style
                            : StyleSheet.compose(styles.container, p.style)
                    }
                >
                    {p.children}
                </View>
            </ScrollCoreProvider>
        </>
    );
};

/** Container component. */
const Container: React.ForwardRefExoticComponent<
    ContainerProps & React.RefAttributes<View>
> = React.forwardRef(_Container);

Container.displayName = "Container";

export type { ContainerProps };
export { Container };
