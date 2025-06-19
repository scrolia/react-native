import type {
    FlatList,
    GestureResponderEvent,
    PanResponderGestureState,
    PanResponderInstance,
} from "react-native";

import type { ScrollCore } from "#/hooks/core";

import * as React from "react";
import { PanResponder, type ScrollView } from "react-native";

import { useScrollCore } from "#/hooks/core";

type StartPos = {
    offsetTop: number;
    y: number;
};

const usePanResponderY = (): PanResponderInstance => {
    const core: ScrollCore = useScrollCore();

    const { viewOffset, dragRef, setDrag, elType, elRef, view, total } = core.y;

    const startPos = React.useRef<StartPos>({
        offsetTop: 0,
        y: 0,
    });

    return PanResponder.create({
        onStartShouldSetPanResponder: (): boolean => true,
        onMoveShouldSetPanResponder: (): boolean => true,
        onPanResponderGrant: (
            _: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            startPos.current = {
                offsetTop: viewOffset.current ?? 0,
                y: state.y0,
            };
            dragRef.current = true;
            setDrag(true);
        },
        onPanResponderMove: (
            _: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            if (!dragRef || !dragRef.current || !elRef || !elRef.current) {
                return void 0;
            }

            // declarations
            const _startPos: StartPos = startPos.current;

            // calculations
            const deltaY: number = _startPos.y + state.dy - _startPos.y;
            const ratio: number = (view.current ?? 0) / (total.current ?? 0);
            const y: number = _startPos.offsetTop + deltaY / ratio;

            switch (elType.current) {
                case "scrollview": {
                    (elRef.current as ScrollView).scrollTo({
                        y,
                        animated: false,
                    });

                    break;
                }
                case "flatlist": {
                    (elRef.current as FlatList).scrollToOffset({
                        offset: y,
                        animated: false,
                    });

                    break;
                }
            }
        },
        onPanResponderRelease: (): void => {
            dragRef.current = false;
            setDrag(false);
        },
    });
};

export { usePanResponderY };
