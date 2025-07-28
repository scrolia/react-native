"use client";

import type { ScrollViewProps } from "react-native";

import * as React from "react";
import { ScrollView } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { getComponentProps } from "#/functions/props";
import { useContentXHandler } from "#/hooks/content";

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
    const {
        options: { disabled, plugins },
        x: { contentRef, contentType },
    } = useScrollCore();

    const p: ContentXProps = getComponentProps({
        name: "contentX",
        props,
        plugins,
    });

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

    const { onLayout, onContentSizeChange, onScroll } = useContentXHandler({
        props: p,
    });

    return (
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
            {p.children}
        </ScrollView>
    );
};

export type { ContentXProps };
export { ContentX };
