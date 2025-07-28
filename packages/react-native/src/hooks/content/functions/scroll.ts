import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import type { Axis, OnScrollResult, Plugin } from "#/@types/options";

import { tryPlugin } from "#/functions/plugin";

type HandleScrollOptions = {
    axis: Axis;
    event: NativeSyntheticEvent<NativeScrollEvent>;
    disabled: boolean;
    animated: boolean;
    plugins: Plugin[];
    hvTrack: boolean;
    hvThumb: boolean;
    total: React.RefObject<number>;
    view: React.RefObject<number>;
    viewOffset: React.RefObject<number>;
    scrollbarOffset: number;
    setScrollbarOffset: React.Dispatch<React.SetStateAction<number>>;
};

const handleScrollFn = ({
    axis,
    event,
    disabled,
    animated,
    plugins,
    hvTrack,
    hvThumb,
    total,
    view,
    viewOffset,
    scrollbarOffset,
    setScrollbarOffset,
}: HandleScrollOptions): void => {
    viewOffset.current = event.nativeEvent.contentOffset[axis];

    const scrollbarOffsetNext: number =
        (viewOffset.current / total.current) * view.current;

    let result: OnScrollResult | undefined;

    for (const plugin of plugins) {
        if (!plugin.onScroll) continue;

        result =
            tryPlugin(plugin, plugin.onScroll, {
                axis,
                isDisabled: disabled,
                isAnimated: animated,
                isDefined: hvTrack && hvThumb,
                total: total.current,
                view: view.current,
                viewOffset: viewOffset.current,
                scrollbarOffsetPrev: scrollbarOffset,
                scrollbarOffsetNext,
            }) ?? result;
    }

    let offset: number;

    if (result?.scrollbarOffset) {
        offset = result.scrollbarOffset;
    } else {
        offset = scrollbarOffsetNext;
    }

    setScrollbarOffset(offset);
};

export type { HandleScrollOptions };
export { handleScrollFn };
