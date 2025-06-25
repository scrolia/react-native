import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { useSetLengthX } from "#/hooks/base/length/x";
import { useHandleScrollX } from "#/hooks/base/scroll/x";

type UseContentHandlerOptions = {
    disabled?: boolean;
    props?: any;
};

const useContentHandlerX = (options?: UseContentHandlerOptions) => {
    const { disabled, props } = options ?? {};

    const {
        x: { total, view },
    } = useScrollCore();

    const setLength = useSetLengthX();

    const onLayout = (event: LayoutChangeEvent): void => {
        if (!disabled) {
            view.current = event.nativeEvent.layout.width;
            setLength();
        }

        props?.onLayout?.(event);
    };

    const onContentSizeChange = (width: number, height: number): void => {
        if (!disabled) {
            total.current = width;
            setLength();
        }

        props?.onContentSizeChange?.(width, height);
    };

    const _onScroll = useHandleScrollX();

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
        if (!disabled) _onScroll(event);
        props?.onScroll?.(event);
    };

    return {
        onLayout,
        onContentSizeChange,
        onScroll,
    };
};

type ContentHandlerX = ReturnType<typeof useContentHandlerX>;

export type { UseContentHandlerOptions, ContentHandlerX };
export { useContentHandlerX };
