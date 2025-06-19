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

/** Props for the `ContentY` component. */
type ContentYProps = ScrollViewProps;

const Content = (
    props: ContentYProps,
    ref: React.Ref<ScrollView>,
): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    React.useImperativeHandle(ref, (): ScrollView => {
        return core.y.elRef.current as ScrollView;
    }, [
        core.y.elRef,
    ]);

    React.useEffect((): void => {
        core.y.elType.current = "scrollview";
    }, [
        core.y.elType,
    ]);

    const handleLayout = (event: LayoutChangeEvent): void => {
        if (!core.options.disabled) core.y.handleLayout(event);
        p.onLayout?.(event);
    };

    const handleContentSizeChange = (width: number, height: number): void => {
        if (!core.options.disabled)
            core.y.handleContentSizeChange(width, height);
        p.onContentSizeChange?.(width, height);
    };

    const handleScroll = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ): void => {
        if (!core.options.disabled) core.y.handleScroll(event);
        p.onScroll?.(event);
    };

    return (
        <>
            <ScrollView
                {...p}
                ref={core.y.elRef}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={
                    p.showsVerticalScrollIndicator ?? core.options.disabled
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

/**
 * Content component.
 *
 * Use `ListY` for a list of items.
 */
const ContentY: React.ForwardRefExoticComponent<
    ContentYProps & React.RefAttributes<ScrollView>
> = React.forwardRef(Content);

ContentY.displayName = "ContentY";

export type { ContentYProps };
export { ContentY };
