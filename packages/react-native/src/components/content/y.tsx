"use client";

import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollViewProps,
} from "react-native";

import { useContentHandlerY, useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { ScrollView } from "react-native";

/** Props for the `ContentY` component. */
type ContentYProps = ScrollViewProps & {
    ref?: React.Ref<ScrollView>;
};

/**
 * Vertical Content component.
 *
 * Use `ListY` for a list of items.
 */
const ContentY = (props: ContentYProps): React.JSX.Element => {
    const { children, ...p } = props;

    const {
        options: { disabled },
        y: { contentRef, contentType },
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
            <ScrollView
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
            </ScrollView>
        </>
    );
};

export type { ContentYProps };
export { ContentY };
