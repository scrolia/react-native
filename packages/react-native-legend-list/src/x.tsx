"use client";

import type { LegendListProps, LegendListRef } from "@legendapp/list";

import { LegendList } from "@legendapp/list";
import { useScrollCore } from "@scrolia/react-native/contexts/scrollcore";
import { getComponentProps } from "@scrolia/react-native/functions/props";
import { useContentXHandler } from "@scrolia/react-native/hooks/content";
import * as React from "react";

/** Props for the `LegendListX` component. */
type LegendListXProps<T> = LegendListProps<T> & {
    ref?: React.Ref<LegendListRef>;
};

/**
 * Horizontal list component based on `@legendapp/list`.
 *
 * **This component requires `@legendapp/list` to be installed.**
 */
const LegendListX = <T,>(props: LegendListXProps<T>): React.JSX.Element => {
    const {
        options: { disabled, plugins },
        x: { contentType, contentRef },
    } = useScrollCore();

    const p: LegendListXProps<T> = getComponentProps({
        name: "listX",
        props,
        plugins,
    });

    React.useImperativeHandle(p.ref, (): LegendListRef => {
        return contentRef.current as LegendListRef;
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
        <LegendList
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
        />
    );
};

export type { LegendListXProps };
export { LegendListX };
