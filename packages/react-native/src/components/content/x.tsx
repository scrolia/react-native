"use client";

import type { ScrollViewProps } from "react-native";

import * as React from "react";
import { ScrollView } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { useContentHandlerX } from "#/hooks/content/x";

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

    const { onLayout, onContentSizeChange, onScroll } = useContentHandlerX({
        disabled,
        props,
    });

    return (
        <>
            <ScrollView
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
            </ScrollView>
        </>
    );
};

export type { ContentXProps };
export { ContentX };
