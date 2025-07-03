"use client";

import type * as React from "react";
import type { ViewProps } from "react-native";

import { View } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { getComponentProps } from "#/functions/props";

/** Props for the `Container` component. */
type ContainerProps = ViewProps & {
    ref?: React.Ref<View>;
};

/** Container component. */
const Container = (props: ContainerProps): React.JSX.Element => {
    const {
        options: { plugins },
    } = useScrollCore();

    const p: ContainerProps = getComponentProps({
        name: "container",
        props,
        plugins,
    });

    return <View {...p}>{p.children}</View>;
};

export type { ContainerProps };
export { Container };
