"use client";

import type * as React from "react";
import type { ScrollViewProps } from "react-native";

import { View } from "react-native";

/** Props for the `Container` component. */
type ContainerProps = ScrollViewProps & {
    ref?: React.Ref<View>;
};

/** Container component. */
const Container = (props: ContainerProps): React.JSX.Element => {
    return (
        <>
            <View {...props}>{props.children}</View>
        </>
    );
};

export type { ContainerProps };
export { Container };
