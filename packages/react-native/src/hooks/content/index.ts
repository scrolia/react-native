import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import type { Axis } from "#/@types/options";

import { useScrollCore } from "#/contexts/scrollcore";
import { setLengthFn } from "#/hooks/content/functions/length";
import { handleScrollFn } from "#/hooks/content/functions/scroll";

/** Options for the `useContentHandler` hook. */
type UseContentHandlerOptions = {
    props?: any;
};

/** Content handler. */
const createContentHandler = (
    axis: Axis,
    options?: UseContentHandlerOptions,
) => {
    const { props } = options ?? {};

    const {
        options: { disabled, animated, plugins },
        [axis]: {
            hvTrack,
            hvThumb,
            total,
            view,
            viewOffset,
            scrollbarLength,
            setScrollbarLength,
            scrollbarOffset,
            setScrollbarOffset,
        },
    } = useScrollCore();

    const setLength = setLengthFn({
        axis,
        disabled,
        animated,
        plugins,
        hvTrack,
        hvThumb,
        total,
        view,
        viewOffset,
        scrollbarLength,
        setScrollbarLength,
    });

    const onLayout = (event: LayoutChangeEvent): void => {
        if (!disabled) {
            if (axis === "x") {
                view.current = event.nativeEvent.layout.width;
            } else {
                view.current = event.nativeEvent.layout.height;
            }

            setLength();
        }

        props?.onLayout?.(event);
    };

    const onContentSizeChange = (width: number, height: number): void => {
        if (!disabled) {
            if (axis === "x") {
                total.current = width;
            } else {
                total.current = height;
            }

            setLength();
        }

        props?.onContentSizeChange?.(width, height);
    };

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
        if (!disabled)
            handleScrollFn({
                axis,
                event,
                disabled,
                animated,
                plugins,
                hvTrack,
                hvThumb,
                total,
                view,
                viewOffset,
                scrollbarOffset,
                setScrollbarOffset,
            });

        props?.onScroll?.(event);
    };

    return {
        onLayout,
        onContentSizeChange,
        onScroll,
    };
};

const useContentXHandler = (options?: UseContentHandlerOptions) => {
    return createContentHandler("x", options);
};

const useContentYHandler = (options?: UseContentHandlerOptions) => {
    return createContentHandler("y", options);
};

/** Result of the `useContentXHandler` hook. */
type ContentXHandler = ReturnType<typeof useContentXHandler>;

/** Result of the `useContentYHandler` hook. */
type ContentYHandler = ReturnType<typeof useContentYHandler>;

export type { UseContentHandlerOptions, ContentXHandler, ContentYHandler };
export { useContentXHandler, useContentYHandler };
