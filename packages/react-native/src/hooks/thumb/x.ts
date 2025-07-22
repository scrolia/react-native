import type { PanResponderInstance } from "react-native";

import { usePanResponderX } from "#/hooks/base/pan/x";

/** Hook for thumb logic. */
const useThumbXHandler = () => {
    const panResponder: PanResponderInstance = usePanResponderX();

    return {
        panResponder,
    };
};

/** Result of the `useThumbXHandler` hook. */
type ThumbXHandler = ReturnType<typeof useThumbXHandler>;

export type { ThumbXHandler };
export { useThumbXHandler };
