import type { LayoutChangeEvent } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { useSetLengthY } from "#/hooks/base/length/y";
import { useHandleScrollY } from "#/hooks/base/scroll/y";

const useContentHandlerY = () => {
    const {
        y: { total, view },
    } = useScrollCore();

    const setLength = useSetLengthY();

    const onLayout = (event: LayoutChangeEvent): void => {
        view.current = event.nativeEvent.layout.height;
        setLength();
    };

    const onContentSizeChange = (_: number, height: number): void => {
        total.current = height;
        setLength();
    };

    const onScroll = useHandleScrollY();

    return {
        onLayout,
        onContentSizeChange,
        onScroll,
    };
};

type ContentHandlerY = ReturnType<typeof useContentHandlerY>;

export type { ContentHandlerY };
export { useContentHandlerY };
