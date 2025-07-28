import type {
    FlatList,
    GestureResponderEvent,
    PanResponderGestureState,
    PanResponderInstance,
} from "react-native";

import type { Axis, OnDragMoveResult, Plugin } from "#/@types/options";

import * as React from "react";
import { PanResponder, type ScrollView } from "react-native";

import { type ContentType, useScrollCore } from "#/contexts/scrollcore";
import { tryPlugin } from "#/functions/plugin";

type StartPos = {
    viewOffset: number;
    pointerOffset: number;
};

type OnPanResponderGrantOptions = {
    axis: Axis;
    event: GestureResponderEvent;
    state: PanResponderGestureState;
    startPos: React.RefObject<StartPos>;
    isDrag: React.RefObject<boolean>;
    disabled: boolean;
    animated: boolean;
    plugins: Plugin[];
    hvTrack: boolean;
    hvThumb: boolean;
    total: React.RefObject<number>;
    view: React.RefObject<number>;
    viewOffset: React.RefObject<number>;
};

const onPanResponderGrant = ({
    axis,
    event,
    state,
    startPos,
    isDrag,
    disabled,
    animated,
    plugins,
    hvTrack,
    hvThumb,
    total,
    view,
    viewOffset,
}: OnPanResponderGrantOptions) => {
    event.preventDefault();

    const pointerOffset: number = axis === "x" ? state.x0 : state.y0;

    startPos.current = {
        viewOffset: viewOffset.current,
        pointerOffset,
    };

    for (const plugin of plugins) {
        if (!plugin.onDragStart) continue;

        tryPlugin(plugin, plugin.onDragStart, {
            axis,
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
};

type OnPanResponderMoveOptions = {
    axis: Axis;
    state: PanResponderGestureState;
    startPos: React.RefObject<StartPos>;
    isDrag: React.RefObject<boolean>;
    disabled: boolean;
    animated: boolean;
    plugins: Plugin[];
    contentType: React.RefObject<ContentType>;
    contentRef: React.RefObject<any>;
    hvTrack: boolean;
    hvThumb: boolean;
    total: React.RefObject<number>;
    view: React.RefObject<number>;
    viewOffset: React.RefObject<number>;
};

const onPanResponderMove = ({
    axis,
    state,
    startPos,
    isDrag,
    disabled,
    animated,
    plugins,
    contentType,
    contentRef,
    hvTrack,
    hvThumb,
    total,
    view,
    viewOffset,
}: OnPanResponderMoveOptions): void => {
    if (!isDrag.current || !contentRef.current) return void 0;

    // declarations
    const _startPos: StartPos = startPos.current;

    // calculations
    const delta: number = axis === "x" ? state.dx : state.dy;
    const ratio: number = view.current / total.current;

    const scrollTo: number = _startPos.viewOffset + delta / ratio;

    let result: OnDragMoveResult | undefined;

    for (const plugin of plugins) {
        if (!plugin.onDragMove) continue;

        result =
            tryPlugin(plugin, plugin.onDragMove, {
                axis,
                isDisabled: disabled,
                isAnimated: animated,
                isDefined: hvTrack && hvThumb,
                total: total.current,
                view: view.current,
                viewOffset: viewOffset.current,
                pointerOffset:
                    _startPos.pointerOffset +
                    (axis === "x" ? state.dx : state.dy),
                viewOffsetInit: _startPos.viewOffset,
                pointerOffsetInit: _startPos.pointerOffset,
                delta,
                ratio,
                scrollTo: result?.scrollTo ?? scrollTo,
            }) ?? result;
    }

    let final: number;

    if (result?.scrollTo) {
        final = result.scrollTo;
    } else {
        final = scrollTo;
    }

    switch (contentType.current) {
        case "scrollview": {
            (contentRef.current as ScrollView).scrollTo({
                ...(axis === "x"
                    ? {
                          x: final,
                      }
                    : {
                          y: final,
                      }),
                animated: false,
            });

            break;
        }
        case "flatlist": {
            (contentRef.current as FlatList).scrollToOffset({
                offset: final,
                animated: false,
            });

            break;
        }
    }
};

type OnPanResponderReleaseOptions = {
    axis: Axis;
    state: PanResponderGestureState;
    startPos: React.RefObject<StartPos>;
    isDrag: React.RefObject<boolean>;
    disabled: boolean;
    animated: boolean;
    plugins: Plugin[];
    hvTrack: boolean;
    hvThumb: boolean;
    total: React.RefObject<number>;
    view: React.RefObject<number>;
    viewOffset: React.RefObject<number>;
};

const onPanResponderRelease = ({
    axis,
    state,
    startPos,
    isDrag,
    disabled,
    animated,
    plugins,
    hvTrack,
    hvThumb,
    total,
    view,
    viewOffset,
}: OnPanResponderReleaseOptions) => {
    const _startPos: StartPos = startPos.current;

    for (const plugin of plugins) {
        if (!plugin.onDragEnd) continue;

        tryPlugin(plugin, plugin.onDragEnd, {
            axis,
            isDisabled: disabled,
            isAnimated: animated,
            isDefined: hvTrack && hvThumb,
            total: total.current,
            view: view.current,
            viewOffset: viewOffset.current,
            pointerOffset: axis === "x" ? state.x0 : state.y0,
            viewOffsetInit: _startPos.viewOffset,
            pointerOffsetInit: _startPos.pointerOffset,
        });
    }

    isDrag.current = false;
};

const createPanResponder = (axis: Axis): PanResponderInstance => {
    const {
        options: { disabled, animated, plugins },
        [axis]: {
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

    const responder: PanResponderInstance = PanResponder.create({
        onStartShouldSetPanResponder: (): boolean => true,
        onMoveShouldSetPanResponder: (): boolean => true,
        onPanResponderGrant: (
            event: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            onPanResponderGrant({
                axis,
                event,
                state,
                startPos,
                isDrag,
                disabled,
                animated,
                plugins,
                hvTrack,
                hvThumb,
                total,
                view,
                viewOffset,
            });
        },
        onPanResponderMove: (
            _: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            onPanResponderMove({
                axis,
                state,
                startPos,
                isDrag,
                disabled,
                animated,
                plugins,
                contentType,
                contentRef,
                hvTrack,
                hvThumb,
                total,
                view,
                viewOffset,
            });
        },
        onPanResponderRelease: (
            _: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            onPanResponderRelease({
                axis,
                state,
                startPos,
                isDrag,
                disabled,
                animated,
                plugins,
                hvTrack,
                hvThumb,
                total,
                view,
                viewOffset,
            });
        },
    });

    return responder;
};

export { createPanResponder };
