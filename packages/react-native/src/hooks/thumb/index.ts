import type { PanResponderInstance } from "react-native";

import type { Axis } from "#/@types/options";

import * as React from "react";

import { createPanResponder } from "#/hooks/thumb/functions/pan";

const createThumbHandler = (axis: Axis) => {
    const _panResponder: PanResponderInstance = createPanResponder(axis);

    const panResponder: PanResponderInstance =
        React.useRef<PanResponderInstance>(_panResponder).current;

    return {
        panResponder,
    };
};

/** Hook for thumb logic. */
const useThumbXHandler = () => createThumbHandler("x");

/** Hook for thumb logic. */
const useThumbYHandler = () => createThumbHandler("y");

/** Result of the `useThumbXHandler` hook. */
type ThumbXHandler = ReturnType<typeof useThumbXHandler>;

/** Result of the `useThumbYHandler` hook. */
type ThumbYHandler = ReturnType<typeof useThumbYHandler>;

export type { ThumbXHandler, ThumbYHandler };
export { useThumbXHandler, useThumbYHandler };
