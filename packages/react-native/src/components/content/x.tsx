"use client";

import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollViewProps,
} from "react-native";

import { useContentHandlerX, useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { ScrollView } from "react-native";

/** Props for the `ContentX` component. */
type ContentXProps = ScrollViewProps & {
    ref?: React.Ref<ScrollView>;
};

/**
 * Horizontal Content component.
 *
 * Use `ListX` for a list of items.
 */
const ContentX = (props: ContentXProps): React.JSX.Element => {
    const { children, ...p } = props;

    const {
        options: { disabled },
        x: { contentRef, contentType },
    } = useScrollCore();

    React.useImperativeHandle(p.ref, (): ScrollView => {
        return contentRef.current as ScrollView;
    }, [
        contentRef,
    ]);

    React.useEffect((): void => {
        contentType.current = "scrollview";
    }, [
        contentType,
    ]);

    const { onLayout, onContentSizeChange, onScroll } = useContentHandlerX();

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
            <ScrollView
                {...p}
                ref={contentRef}
                showsHorizontalScrollIndicator={
                    p.showsHorizontalScrollIndicator ?? disabled
                }
                showsVerticalScrollIndicator={false}
                onLayout={handleLayout}
                onContentSizeChange={handleContentSizeChange}
                onScroll={handleScroll}
                horizontal={true}
                scrollEventThrottle={p.scrollEventThrottle ?? 5}
            >
                {children}
            </ScrollView>
        </>
    );
};

export type { ContentXProps };
export { ContentX };
