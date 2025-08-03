"use client";

import type { FlashListProps, FlashListRef } from "@shopify/flash-list";

import { useScrollCore } from "@scrolia/react-native/contexts/scrollcore";
import { getComponentProps } from "@scrolia/react-native/functions/props";
import { useContentXHandler } from "@scrolia/react-native/hooks/content";
import { FlashList } from "@shopify/flash-list";
import * as React from "react";

/** Props for the `FlashListX` component. */
type FlashListXProps<T> = FlashListProps<T> & {
    ref?: React.Ref<FlashListRef<T>>;
};

/**
 * Horizontal list component based on `@shopify/flash-list`.
 *
 * **This component requires `@shopify/flash-list` to be installed.**
 */
const FlashListX = <T,>(props: FlashListXProps<T>): React.JSX.Element => {
    const {
        options: { disabled, plugins },
        x: { contentType, contentRef },
    } = useScrollCore();

    const p: FlashListXProps<T> = getComponentProps({
        name: "listX",
        props,
        plugins,
    });

    React.useImperativeHandle(p.ref, (): FlashListRef<T> => {
        return contentRef.current as FlashListRef<T>;
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
        <FlashList
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
        </FlashList>
    );
};

export type { FlashListXProps };
export { FlashListX };
