import type { Options } from "@scrolia/react-native";
import type { ListRenderItem } from "@shopify/flash-list";
import type * as React from "react";

import { Container, ThumbY, TrackY } from "@scrolia/react-native";
import { FlashListY } from "@scrolia/react-native-flash-list";

type ListProps<T> = Omit<Options, "headless"> & {
    data: ReadonlyArray<T>;
    renderItem: ListRenderItem<T>;
    estimatedItemSize?: number;
};

const List = <T,>(props: ListProps<T>): React.JSX.Element => {
    const { data, renderItem, estimatedItemSize, ...p } = props;

    return (
        <>
            <Container {...p}>
                <FlashListY
                    data={data}
                    renderItem={renderItem}
                    estimatedItemSize={estimatedItemSize}
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
