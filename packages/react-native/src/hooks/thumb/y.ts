import type { PanResponderInstance } from "react-native";

import * as React from "react";

import { usePanResponderY } from "#/hooks/base/pan/y";

/** Hook for thumb logic. */
const useThumbYHandler = () => {
    const panResponderRaw: PanResponderInstance = usePanResponderY();
    const panResponder: PanResponderInstance =
        React.useRef(panResponderRaw).current;

    return {
        panResponder,
    };
};

/** Result of the `useThumbYHandler` hook. */
type ThumbYHandler = ReturnType<typeof useThumbYHandler>;

export type { ThumbYHandler };
export { useThumbYHandler };
