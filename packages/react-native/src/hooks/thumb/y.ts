import type { PanResponderInstance } from "react-native";

import { usePanResponderY } from "#/hooks/base/pan/y";

/** Hook for thumb logic. */
const useThumbYHandler = () => {
    const panResponder: PanResponderInstance = usePanResponderY();

    return {
        panResponder,
    };
};

/** Result of the `useThumbYHandler` hook. */
type ThumbYHandler = ReturnType<typeof useThumbYHandler>;

export type { ThumbYHandler };
export { useThumbYHandler };
