import type { Options } from "@scrolia/react-native";
import type * as React from "react";
import type { Format, Omit } from "ts-vista";

import {
    Container,
    ContentX,
    ContentY,
    ThumbX,
    ThumbY,
    TrackX,
    TrackY,
} from "@scrolia/react-native";

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
