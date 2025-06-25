import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import type { UseContentHandlerOptions } from "#/hooks/content/x";

import { useScrollCore } from "#/contexts/scrollcore";
import { useSetLengthY } from "#/hooks/base/length/y";
import { useHandleScrollY } from "#/hooks/base/scroll/y";

const useContentHandlerY = (options?: UseContentHandlerOptions) => {
    const { disabled, props } = options ?? {};

    const {
        y: { total, view },
    } = useScrollCore();

    const setLength = useSetLengthY();

    const onLayout = (event: LayoutChangeEvent): void => {
        if (!disabled) {
            view.current = event.nativeEvent.layout.height;
            setLength();
        }

        props?.onLayout?.(event);
    };

    const onContentSizeChange = (width: number, height: number): void => {
        if (!disabled) {
            total.current = height;
            setLength();
        }

        props?.onContentSizeChange?.(width, height);
    };

    const _onScroll = useHandleScrollY();

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

type ContentHandlerY = ReturnType<typeof useContentHandlerY>;

export type { ContentHandlerY };
export { useContentHandlerY };
