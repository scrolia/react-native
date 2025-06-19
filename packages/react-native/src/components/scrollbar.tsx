import type { Options } from "@scrolia/react-native-core";
import type * as React from "react";
import type { Format } from "ts-vista";

import { ThumbX, ThumbY } from "@scrolia/react-native-core-thumb";

import { Container } from "#/base/container";
import { ContentX } from "#/base/content/x";
import { ContentY } from "#/base/content/y";
import { TrackX } from "#/base/track/x";
import { TrackY } from "#/base/track/y";

/** Props for the `Scrollbar` component. */
type ScrollbarProps = Format<
    Pick<Options, "disabled" | "thumbColor" | "useNativeDriver"> & {
        children?: React.ReactNode;
    }
>;

/**
 * Scrollbar component.
 *
 * ### Example
 *
 * ```tsx
 * import type * as React from "react";
 *
 * import { View } from "react-native";
 * import { Scrollbar } from "@scrolia/react-native";
 *
 * const App = (): React.JSX.Element => {
 *     return (
 *         <>
 *             <View>
 *                 <Scrollbar>
 *                     <View>Content</View>
 *                 </Scrollbar>
 *             </View>
 *         </>
 *     );
 * }
 * ```
 */
const Scrollbar = (props: ScrollbarProps): React.JSX.Element => {
    const { children, ...p } = props;

    return (
        <>
            <Container {...p}>
                <ContentX>
                    <ContentY>{children}</ContentY>
                </ContentX>
                <TrackX>
                    <ThumbX />
                </TrackX>
                <TrackY>
                    <ThumbY />
                </TrackY>
            </Container>
        </>
    );
};

export type { ScrollbarProps };
export { Scrollbar };
