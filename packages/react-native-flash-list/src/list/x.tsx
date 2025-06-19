"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type { FlashListProps } from "@shopify/flash-list";
import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import { useScrollCore } from "@scrolia/react-native-core";
import { FlashList } from "@shopify/flash-list";
import * as React from "react";

/** Props for the `FlashListX` component. */
type FlashListXProps<T> = FlashListProps<T>;

const List = <T,>(
    props: FlashListXProps<T>,
    ref: React.Ref<FlashList<T>>,
): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    React.useImperativeHandle(ref, (): FlashList<T> => {
        return core.x.elRef.current as FlashList<T>;
    }, [
        core.x.elRef,
    ]);

    React.useEffect((): void => {
        core.x.elType.current = "flatlist";
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
            <FlashList
                {...p}
                ref={core.x.elRef}
                showsHorizontalScrollIndicator={core.options.disabled}
                showsVerticalScrollIndicator={false}
                onLayout={handleLayout}
                onContentSizeChange={handleContentSizeChange}
                onScroll={handleScroll}
                horizontal={true}
                scrollEventThrottle={p.scrollEventThrottle ?? 5}
            >
                {children}
            </FlashList>
        </>
    );
};

/**
 * Horizontal list component based on `@shopify/flash-list`.
 *
 * **This component requires `@shopify/flash-list` to be installed.**
 */
const FlashListX = React.forwardRef(List) as <T>(
    props: FlashListXProps<T> & {
        ref?: React.Ref<FlashList<T>>;
    },
) => ReturnType<typeof List>;

// @ts-expect-error
FlashListX.displayName = "FlashListX";

export type { FlashListXProps };
export { FlashListX };
