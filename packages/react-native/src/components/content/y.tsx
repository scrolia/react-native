"use client";

import type { ScrollViewProps } from "react-native";

import * as React from "react";
import { ScrollView } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { getComponentProps } from "#/functions/props";
import { useContentYHandler } from "#/hooks/content";

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
    const {
        options: { disabled, plugins },
        y: { contentRef, contentType },
    } = useScrollCore();

    const p: ContentYProps = getComponentProps({
        name: "contentY",
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

    const { onLayout, onContentSizeChange, onScroll } = useContentYHandler({
        props: p,
    });

    return (
        <ScrollView
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
        </ScrollView>
    );
};

export type { ContentYProps };
export { ContentY };
