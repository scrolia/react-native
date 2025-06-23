import type { PanResponderInstance } from "react-native";

import * as React from "react";

import { usePanResponderX } from "#/hooks/base/pan/x";

const useThumbHandlerX = () => {
    const panResponderRaw: PanResponderInstance = usePanResponderX();
    const panResponder: PanResponderInstance =
        React.useRef(panResponderRaw).current;

    return {
        panResponder,
    };
};

type ThumbHandlerX = ReturnType<typeof useThumbHandlerX>;

export type { ThumbHandlerX };
export { useThumbHandlerX };
