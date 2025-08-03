"use client";

import type { FlashListProps, FlashListRef } from "@shopify/flash-list";

import { useScrollCore } from "@scrolia/react-native/contexts/scrollcore";
import { getComponentProps } from "@scrolia/react-native/functions/props";
import { useContentYHandler } from "@scrolia/react-native/hooks/content";
import { FlashList } from "@shopify/flash-list";
import * as React from "react";

/** Props for the `FlashListY` component. */
type FlashListYProps<T> = FlashListProps<T> & {
    ref?: React.Ref<FlashListRef<T>>;
};

/**
 * Vertical list component based on `@shopify/flash-list`.
 *
 * **This component requires `@shopify/flash-list` to be installed.**
 */
const FlashListY = <T,>(props: FlashListYProps<T>): React.JSX.Element => {
    const {
        options: { disabled, plugins },
        y: { contentType, contentRef },
    } = useScrollCore();

    const p: FlashListYProps<T> = getComponentProps({
        name: "listY",
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

    const { onLayout, onContentSizeChange, onScroll } = useContentYHandler({
        props,
    });

    return (
        <FlashList
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
        </FlashList>
    );
};

export type { FlashListYProps };
export { FlashListY };
