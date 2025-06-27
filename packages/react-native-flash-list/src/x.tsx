"use client";

import type { FlashListProps } from "@shopify/flash-list";

import {
    getComponentProps,
    useContentHandlerX,
    useScrollCore,
} from "@scrolia/react-native";
import { FlashList } from "@shopify/flash-list";
import * as React from "react";

/** Props for the `FlashListX` component. */
type FlashListXProps<T> = FlashListProps<T> & {
    ref?: React.Ref<FlashList<T>>;
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

    React.useImperativeHandle(p.ref, (): FlashList<T> => {
        return contentRef.current as FlashList<T>;
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
        props: p,
    });

    return (
        <>
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
        </>
    );
};

export type { FlashListXProps };
export { FlashListX };
