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

/** Props for the `ListX` component. */
type ListXProps<T> = FlatListProps<T>;

const List = <T,>(
    props: ListXProps<T>,
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
            <FlatList
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
            </FlatList>
        </>
    );
};

/**
 * Horizontal list component.
 *
 * Use `ContentX` for generic content.
 */
const ListX = React.forwardRef(List) as <T>(
    props: ListXProps<T> & {
        ref?: React.Ref<FlatList<T>>;
    },
) => ReturnType<typeof List>;

// @ts-expect-error
ListX.displayName = "ListX";

export type { ListXProps };
export { ListX };
