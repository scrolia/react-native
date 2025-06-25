"use client";

import type { FlashListProps } from "@shopify/flash-list";
import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import { useContentHandlerY, useScrollCore } from "@scrolia/react-native";
import { FlashList } from "@shopify/flash-list";
import * as React from "react";

/** Props for the `FlashListY` component. */
type FlashListYProps<T> = FlashListProps<T> & {
    ref?: React.Ref<FlashList<T>>;
};

/**
 * Vertical list component based on `@shopify/flash-list`.
 *
 * **This component requires `@shopify/flash-list` to be installed.**
 */
const FlashListY = <T,>(props: FlashListYProps<T>): React.JSX.Element => {
    const { children, ref, ...p } = props;

    const {
        options: { disabled },
        x: { contentType, contentRef },
    } = useScrollCore();

    React.useImperativeHandle(ref, (): FlashList<T> => {
        return contentRef.current as FlashList<T>;
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
            <FlashList
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
            </FlashList>
        </>
    );
};

export type { FlashListYProps };
export { FlashListY };
