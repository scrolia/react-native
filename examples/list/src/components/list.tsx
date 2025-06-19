import type { Options } from "@scrolia/react-native";
import type * as React from "react";
import type { ListRenderItem } from "react-native";

import { Container, ListY, ThumbY, TrackY } from "@scrolia/react-native";

type ListProps<T> = Omit<Options, "headless"> & {
    data: ArrayLike<T>;
    renderItem: ListRenderItem<T>;
};

const List = <T,>(props: ListProps<T>): React.JSX.Element => {
    const { data, renderItem, ...p } = props;

    return (
        <>
            <Container {...p}>
                <ListY
                    data={data}
                    renderItem={renderItem}
                />
                <TrackY>
                    <ThumbY />
                </TrackY>
            </Container>
        </>
    );
};

export type { ListProps };
export { List };
