import type { PanResponderInstance } from "react-native";

import * as React from "react";

import { usePanResponderY } from "#/hooks/base/pan/y";

const useThumbHandlerY = () => {
    const panResponderRaw: PanResponderInstance = usePanResponderY();
    const panResponder: PanResponderInstance =
        React.useRef(panResponderRaw).current;

    return {
        panResponder,
    };
};

type ThumbHandlerY = ReturnType<typeof useThumbHandlerY>;

export type { ThumbHandlerY };
export { useThumbHandlerY };
