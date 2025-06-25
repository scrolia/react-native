"use client";

import type { FlatListProps } from "react-native";

import * as React from "react";
import { FlatList } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { useContentHandlerX } from "#/hooks/content/x";

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
    const { children, ...p } = props;

    const {
        options: { disabled },
        x: { contentRef, contentType },
    } = useScrollCore();

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

    const { onLayout, onContentSizeChange, onScroll } = useContentHandlerX({
        disabled,
        props,
    });

    return (
        <>
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
                {children}
            </FlatList>
        </>
    );
};

export type { ListXProps };
export { ListX };
