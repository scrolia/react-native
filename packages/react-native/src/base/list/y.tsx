"use client";

import type { ScrollCore } from "@scrolia/react-native-core";
import type {
    FlatListProps,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import { useScrollCore } from "@scrolia/react-native-core";
import * as React from "react";
import { FlatList } from "react-native";

/** Props for the `ListY` component. */
type ListYProps<T> = FlatListProps<T>;

const List = <T,>(
    props: ListYProps<T>,
    ref: React.Ref<FlatList<T>>,
): React.JSX.Element => {
    const { children, ...p } = props;

    const core: ScrollCore = useScrollCore();

    React.useImperativeHandle(ref, (): FlatList<T> => {
        return core.y.elRef.current as FlatList<T>;
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
            <FlatList
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
            </FlatList>
        </>
    );
};

/**
 * Vertical list component.
 *
 * Use `ContentY` for generic content.
 */
const ListY = React.forwardRef(List) as <T>(
    props: ListYProps<T> & {
        ref?: React.Ref<FlatList<T>>;
    },
) => ReturnType<typeof List>;

// @ts-expect-error
ListY.displayName = "ListY";

export type { ListYProps };
export { ListY };
