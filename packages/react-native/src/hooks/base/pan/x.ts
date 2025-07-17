import type {
    FlatList,
    GestureResponderEvent,
    PanResponderGestureState,
    PanResponderInstance,
} from "react-native";

import type { OnDragMoveResult } from "#/@types/options";

import * as React from "react";
import { PanResponder, type ScrollView } from "react-native";

import { useScrollCore } from "#/contexts/scrollcore";
import { tryPlugin } from "#/functions/plugin";

type StartPos = {
    viewOffset: number;
    pointerOffset: number;
};

const usePanResponderX = (): PanResponderInstance => {
    const {
        options: { disabled, animated, plugins },
        x: {
            contentType,
            contentRef,
            hvTrack,
            hvThumb,
            total,
            view,
            viewOffset,
        },
    } = useScrollCore();

    const isDrag = React.useRef<boolean>(false);

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
                if (!plugin.onDragStart) continue;

                tryPlugin(plugin, plugin.onDragStart, {
                    position: "x",
                    isDisabled: disabled,
                    isAnimated: animated,
                    isDefined: hvTrack && hvThumb,
                    total: total.current,
                    view: view.current,
                    viewOffset: viewOffset.current,
                    pointerOffset,
                });
            }

            isDrag.current = true;
        },
        onPanResponderMove: (
            _: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            if (!isDrag.current || !contentRef.current) {
                return void 0;
            }

            // declarations
            const _startPos: StartPos = startPos.current;

            // calculations
            const delta: number = state.dx;
            const ratio: number = (view.current ?? 0) / (total.current ?? 0);

            const scrollTo: number = _startPos.viewOffset + delta / ratio;

            let result: OnDragMoveResult | undefined;

            for (const plugin of plugins) {
                if (!plugin.onDragMove) continue;

                result =
                    tryPlugin(plugin, plugin.onDragMove, {
                        position: "x",
                        isDisabled: disabled,
                        isAnimated: animated,
                        isDefined: hvTrack && hvThumb,
                        total: total.current,
                        view: view.current,
                        viewOffset: viewOffset.current,
                        pointerOffset: _startPos.pointerOffset + state.dx,
                        viewOffsetInit: _startPos.viewOffset,
                        pointerOffsetInit: _startPos.pointerOffset,
                        delta,
                        ratio,
                        scrollTo: result?.scrollTo ?? scrollTo,
                    }) ?? result;
            }

            let x: number;

            if (result?.scrollTo) {
                x = result.scrollTo;
            } else {
                x = scrollTo;
            }

            switch (contentType.current) {
                case "scrollview": {
                    (contentRef.current as ScrollView).scrollTo({
                        x,
                        animated: false,
                    });

                    break;
                }
                case "flatlist": {
                    (contentRef.current as FlatList).scrollToOffset({
                        offset: x,
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
                if (!plugin.onDragEnd) continue;

                tryPlugin(plugin, plugin.onDragEnd, {
                    position: "x",
                    isDisabled: disabled,
                    isAnimated: animated,
                    isDefined: hvTrack && hvThumb,
                    total: total.current,
                    view: view.current,
                    viewOffset: viewOffset.current,
                    pointerOffset: state.x0,
                    viewOffsetInit: _startPos.viewOffset,
                    pointerOffsetInit: _startPos.pointerOffset,
                });
            }

            isDrag.current = false;
        },
    });
};

export type { StartPos };
export { usePanResponderX };
