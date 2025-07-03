import type {
    FlatList,
    GestureResponderEvent,
    PanResponderGestureState,
    PanResponderInstance,
} from "react-native";

import type { OnDragMoveResult } from "#/@types/options";
import type { StartPos } from "#/hooks/base/pan/x";

import * as React from "react";
import { PanResponder, type ScrollView } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";

const usePanResponderY = (): PanResponderInstance => {
    const {
        options: { disabled, animated, plugins },
        y: {
            contentType,
            contentRef,
            hvTrack,
            hvThumb,
            total,
            view,
            viewOffset,
            dragRef,
            setIsDrag,
        },
    } = useScrollCore();

    const startPos = React.useRef<StartPos>({
        viewOffset: 0,
        pointerOffset: 0,
    });

    return PanResponder.create({
        onStartShouldSetPanResponder: (): boolean => true,
        onMoveShouldSetPanResponder: (): boolean => true,
        onPanResponderGrant: (
            _: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            const pointerOffset: number = state.x0;

            startPos.current = {
                viewOffset: viewOffset.current ?? 0,
                pointerOffset,
            };

            for (const plugin of plugins) {
                plugin.onDragStart?.({
                    position: "y",
                    isDisabled: disabled,
                    isAnimated: animated,
                    isDefined: hvTrack && hvThumb,
                    total: total.current,
                    view: view.current,
                    viewOffset: viewOffset.current,
                    pointerOffset,
                });
            }

            dragRef.current = true;

            setIsDrag(true);
        },
        onPanResponderMove: (
            _: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            if (
                !dragRef ||
                !dragRef.current ||
                !contentRef ||
                !contentRef.current
            ) {
                return void 0;
            }

            // declarations
            const _startPos: StartPos = startPos.current;

            // calculations
            const delta: number = state.dy;
            const ratio: number = (view.current ?? 0) / (total.current ?? 0);

            const scrollTo: number = _startPos.viewOffset + delta / ratio;

            let result: OnDragMoveResult | undefined;

            for (const plugin of plugins) {
                result = plugin.onDragMove?.({
                    position: "y",
                    isDisabled: disabled,
                    isAnimated: animated,
                    isDefined: hvTrack && hvThumb,
                    total: total.current,
                    view: view.current,
                    viewOffset: viewOffset.current,
                    pointerOffset: _startPos.pointerOffset + state.dy,
                    viewOffsetInit: _startPos.viewOffset,
                    pointerOffsetInit: _startPos.pointerOffset,
                    delta,
                    ratio,
                    scrollTo: result?.scrollTo ?? scrollTo,
                });
            }

            let y: number;

            if (result?.scrollTo) {
                y = result.scrollTo;
            } else {
                y = scrollTo;
            }

            switch (contentType.current) {
                case "scrollview": {
                    (contentRef.current as ScrollView).scrollTo({
                        y,
                        animated: false,
                    });

                    break;
                }
                case "flatlist": {
                    (contentRef.current as FlatList).scrollToOffset({
                        offset: y,
                        animated: false,
                    });

                    break;
                }
            }
        },
        onPanResponderRelease: (
            _: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            const _startPos: StartPos = startPos.current;

            for (const plugin of plugins) {
                plugin.onDragEnd?.({
                    position: "y",
                    isDisabled: disabled,
                    isAnimated: animated,
                    isDefined: hvTrack && hvThumb,
                    total: total.current,
                    view: view.current,
                    viewOffset: viewOffset.current,
                    pointerOffset: state.y0,
                    viewOffsetInit: _startPos.viewOffset,
                    pointerOffsetInit: _startPos.pointerOffset,
                });
            }

            dragRef.current = false;

            setIsDrag(false);
        },
    });
};

export { usePanResponderY };
