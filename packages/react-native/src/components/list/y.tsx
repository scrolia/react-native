"use client";

import type { FlatListProps } from "react-native";

import * as React from "react";
import { FlatList } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { getComponentProps } from "#/functions/props";
import { useContentYHandler } from "#/hooks/content";

/** Props for the `ListY` component. */
type ListYProps<T> = FlatListProps<T> & {
    ref?: React.Ref<FlatList>;
};

/**
 * Vertical list component.
 *
 * Use `ContentY` for generic content.
 */
const ListY = <T,>(props: ListYProps<T>): React.JSX.Element => {
    const {
        options: { disabled, plugins },
        y: { contentRef, contentType },
    } = useScrollCore();

    const p: ListYProps<T> = getComponentProps({
        name: "listY",
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

    const { onLayout, onContentSizeChange, onScroll } = useContentYHandler({
        props: p,
    });

    return (
        <FlatList
            {...p}
            ref={contentRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={
                p.showsHorizontalScrollIndicator ?? disabled
            }
            onLayout={onLayout}
            onContentSizeChange={onContentSizeChange}
            onScroll={onScroll}
            horizontal={false}
            scrollEventThrottle={p.scrollEventThrottle ?? 5}
        >
            {p.children}
        </FlatList>
    );
};

export type { ListYProps };
export { ListY };
