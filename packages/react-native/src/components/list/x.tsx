"use client";

import type { FlatListProps } from "react-native";

import * as React from "react";
import { FlatList } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { getComponentProps } from "#/functions/props";
import { useContentXHandler } from "#/hooks/content";

/** Props for the `ListX` component. */
type ListXProps<T> = FlatListProps<T> & {
    ref?: React.Ref<FlatList>;
};

/**
 * Horizontal list component.
 *
 * Use `ContentX` for generic content.
 */
const ListX = <T,>(props: ListXProps<T>): React.JSX.Element => {
    const {
        options: { disabled, plugins },
        x: { contentRef, contentType },
    } = useScrollCore();

    const p: ListXProps<T> = getComponentProps({
        name: "listX",
        props,
        plugins,
    });

    React.useImperativeHandle(p.ref, (): FlatList => {
        return contentRef.current as FlatList;
    }, [
        contentRef,
    ]);

    React.useEffect((): void => {
        contentType.current = "flatlist";
    }, [
        contentType,
    ]);

    const { onLayout, onContentSizeChange, onScroll } = useContentXHandler({
        props: p,
    });

    return (
        <FlatList
            {...p}
            ref={contentRef}
            showsHorizontalScrollIndicator={
                p.showsHorizontalScrollIndicator ?? disabled
            }
            showsVerticalScrollIndicator={false}
            onLayout={onLayout}
            onContentSizeChange={onContentSizeChange}
            onScroll={onScroll}
            horizontal={true}
            scrollEventThrottle={p.scrollEventThrottle ?? 5}
        >
            {p.children}
        </FlatList>
    );
};

export type { ListXProps };
export { ListX };
