"use client";

import type {
    FlatListProps,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import * as React from "react";
import { FlatList } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { useContentHandlerY } from "#/hooks/content/y";

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
    const { children, ...p } = props;

    const {
        options: { disabled },
        y: { contentRef, contentType },
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

    const { onLayout, onContentSizeChange, onScroll } = useContentHandlerY();

    const handleLayout = (event: LayoutChangeEvent): void => {
        if (!disabled) onLayout(event);
        p.onLayout?.(event);
    };

    const handleContentSizeChange = (width: number, height: number): void => {
        if (!disabled) onContentSizeChange(width, height);
        p.onContentSizeChange?.(width, height);
    };

    const handleScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ): void => {
        if (!disabled) onScroll(event);
        p.onScroll?.(event);
    };

    return (
        <>
            <FlatList
                {...p}
                ref={contentRef}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={
                    p.showsHorizontalScrollIndicator ?? disabled
                }
                onLayout={handleLayout}
                onContentSizeChange={handleContentSizeChange}
                onScroll={handleScroll}
                horizontal={false}
                scrollEventThrottle={p.scrollEventThrottle ?? 5}
            >
                {children}
            </FlatList>
        </>
    );
};

export type { ListYProps };
export { ListY };
