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
    offsetLeft: number;
    x: number;
};

const usePanResponderX = (): PanResponderInstance => {
    const core: ScrollCore = useScrollCore();

    const { viewOffset, dragRef, setDrag, elType, elRef, view, total } = core.x;

    const startPos = React.useRef<StartPos>({
        offsetLeft: 0,
        x: 0,
    });

    return PanResponder.create({
        onStartShouldSetPanResponder: (): boolean => true,
        onMoveShouldSetPanResponder: (): boolean => true,
        onPanResponderGrant: (
            _: GestureResponderEvent,
            state: PanResponderGestureState,
        ): void => {
            startPos.current = {
                offsetLeft: viewOffset.current ?? 0,
                x: state.x0,
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
            const deltaX: number = _startPos.x + state.dx - _startPos.x;
            const ratio: number = (view.current ?? 0) / (total.current ?? 0);
            const x: number = _startPos.offsetLeft + deltaX / ratio;

            switch (elType.current) {
                case "scrollview": {
                    (elRef.current as ScrollView).scrollTo({
                        x,
                        animated: false,
                    });

                    break;
                }
                case "flatlist": {
                    (elRef.current as FlatList).scrollToOffset({
                        offset: x,
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

export { usePanResponderX };
