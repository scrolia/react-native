import type { LayoutChangeEvent } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { useSetLengthX } from "#/hooks/base/length/x";
import { useHandleScrollX } from "#/hooks/base/scroll/x";

const useContentHandlerX = () => {
    const {
        x: { total, view },
    } = useScrollCore();

    const setLength = useSetLengthX();

    const onLayout = (event: LayoutChangeEvent): void => {
        view.current = event.nativeEvent.layout.width;
        setLength();
    };

    const onContentSizeChange = (width: number, _: number): void => {
        total.current = width;
        setLength();
    };

    const onScroll = useHandleScrollX();

    return {
        onLayout,
        onContentSizeChange,
        onScroll,
    };
};

type ContentHandlerX = ReturnType<typeof useContentHandlerX>;

export type { ContentHandlerX };
export { useContentHandlerX };
