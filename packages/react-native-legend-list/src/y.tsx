"use client";

import type { LegendListProps, LegendListRef } from "@legendapp/list";

import { LegendList } from "@legendapp/list";
import { useScrollCore } from "@scrolia/react-native/contexts/scrollcore";
import { getComponentProps } from "@scrolia/react-native/functions/props";
import { useContentYHandler } from "@scrolia/react-native/hooks/content";
import * as React from "react";

/** Props for the `LegendListY` component. */
type LegendListYProps<T> = LegendListProps<T> & {
    ref?: React.Ref<LegendListRef>;
};

/**
 * Vertical list component based on `@legendapp/list`.
 *
 * **This component requires `@legendapp/list` to be installed.**
 */
const LegendListY = <T,>(props: LegendListYProps<T>): React.JSX.Element => {
    const {
        options: { disabled, plugins },
        y: { contentType, contentRef },
    } = useScrollCore();

    const p: LegendListYProps<T> = getComponentProps({
        name: "listY",
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

    const { onLayout, onContentSizeChange, onScroll } = useContentYHandler({
        props: p,
    });

    return (
        <LegendList
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
        />
    );
};

export type { LegendListYProps };
export { LegendListY };
