import type { Options } from "@scrolia/react-native";
import type * as React from "react";
import type { Format, Omit } from "ts-vista";

import {
    Container,
    ContentX,
    ContentY,
    TrackX,
    TrackY,
} from "@scrolia/react-native";
import {
    ReanimatedThumbX,
    ReanimatedThumbY,
} from "@scrolia/react-native-reanimated-thumb";

type ScrollbarProps = Format<
    Omit<Options, "headless"> & {
        children?: React.ReactNode;
    }
>;

const Scrollbar = (props: ScrollbarProps): React.JSX.Element => {
    const { children, ...p } = props;

    return (
        <>
            <Container {...p}>
                <ContentX>
                    <ContentY>{children}</ContentY>
                </ContentX>
                <TrackX>
                    <ReanimatedThumbX />
                </TrackX>
                <TrackY>
                    <ReanimatedThumbY />
                </TrackY>
            </Container>
        </>
    );
};

export type { ScrollbarProps };
export { Scrollbar };
