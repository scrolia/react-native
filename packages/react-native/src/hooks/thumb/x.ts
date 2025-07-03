import type { PanResponderInstance } from "react-native";

import * as React from "react";

import { usePanResponderX } from "#/hooks/base/pan/x";

/** Hook for thumb logic. */
const useThumbXHandler = () => {
    const panResponderRaw: PanResponderInstance = usePanResponderX();
    const panResponder: PanResponderInstance =
        React.useRef(panResponderRaw).current;

    return {
        panResponder,
    };
};

/** Result of the `useThumbXHandler` hook. */
type ThumbXHandler = ReturnType<typeof useThumbXHandler>;

export type { ThumbXHandler };
export { useThumbXHandler };
