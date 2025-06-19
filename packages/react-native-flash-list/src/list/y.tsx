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

/** Props for the `FlashListY` component. */
type FlashListYProps<T> = FlashListProps<T>;

const List = <T,>(
    props: FlashListYProps<T>,
    ref: React.Ref<FlashList<T>>,
): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    React.useImperativeHandle(ref, (): FlashList<T> => {
        return core.y.elRef.current as FlashList<T>;
    }, [
        core.y.elRef,
    ]);

    React.useEffect((): void => {
        core.y.elType.current = "flatlist";
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
            <FlashList
                {...p}
                ref={core.y.elRef}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={core.options.disabled}
                onLayout={handleLayout}
                onContentSizeChange={handleContentSizeChange}
                onScroll={handleScroll}
                horizontal={false}
                scrollEventThrottle={p.scrollEventThrottle ?? 5}
            >
                {children}
            </FlashList>
        </>
    );
};

/**
 * Vertical list component based on `@shopify/flash-list`.
 *
 * **This component requires `@shopify/flash-list` to be installed.**
 */
const FlashListY = React.forwardRef(List) as <T>(
    props: FlashListYProps<T> & {
        ref?: React.Ref<FlashList<T>>;
    },
) => ReturnType<typeof List>;

// @ts-expect-error
FlashListY.displayName = "FlashListY";

export type { FlashListYProps };
export { FlashListY };
