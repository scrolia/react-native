"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollViewProps,
} from "react-native";

import { useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { ScrollView } from "react-native";

/** Props for the `ContentX` component. */
type ContentXProps = ScrollViewProps;

const Content = (
    props: ContentXProps,
    ref: React.Ref<ScrollView>,
): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    React.useImperativeHandle(ref, (): ScrollView => {
        return core.x.elRef.current as ScrollView;
    }, [
        core.x.elRef,
    ]);

    React.useEffect((): void => {
        core.x.elType.current = "scrollview";
    }, [
        core.x.elType,
    ]);

    const handleLayout = (event: LayoutChangeEvent): void => {
        if (!core.options.disabled) core.x.handleLayout(event);
        p.onLayout?.(event);
    };

    const handleContentSizeChange = (width: number, height: number): void => {
        if (!core.options.disabled)
            core.x.handleContentSizeChange(width, height);
        p.onContentSizeChange?.(width, height);
    };

    const handleScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ): void => {
        if (!core.options.disabled) core.x.handleScroll(event);
        p.onScroll?.(event);
    };

    return (
        <>
            <ScrollView
                {...p}
                ref={core.x.elRef}
                showsHorizontalScrollIndicator={
                    p.showsHorizontalScrollIndicator ?? core.options.disabled
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

/**
 * Content component.
 *
 * Use `ListX` for a list of items.
 */
const ContentX: React.ForwardRefExoticComponent<
    ContentXProps & React.RefAttributes<ScrollView>
> = React.forwardRef(Content);

ContentX.displayName = "ContentX";

export type { ContentXProps };
export { ContentX };
