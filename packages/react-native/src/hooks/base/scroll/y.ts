import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import type { OnScrollResult } from "#/@types/options";

import { useScrollCore } from "#/contexts/scrollcore";

const pos = "y" as const;

const useHandleScrollY = () => {
    const {
        options: { disabled, animated, plugins },
        [pos]: {
            hvTrack,
            hvThumb,
            total,
            view,
            viewOffset,
            scrollbarOffset,
            setScrollbarOffset,
        },
    } = useScrollCore();

    return (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
        viewOffset.current = event.nativeEvent.contentOffset[pos];

        const scrollbarOffsetNext: number =
            (viewOffset.current / total.current) * view.current;

        let result: OnScrollResult | undefined;

        for (const plugin of plugins) {
            result = plugin.onScroll?.({
                position: pos,
                isDisabled: disabled,
                isAnimated: animated,
                isDefined: hvTrack && hvThumb,
                total: total.current,
                view: view.current,
                viewOffset: viewOffset.current,
                scrollbarOffsetPrev: scrollbarOffset,
                scrollbarOffsetNext,
            });
        }

        let offset: number;

        if (result?.scrollbarOffset) {
            offset = result.scrollbarOffset;
        } else {
            offset = scrollbarOffsetNext;
        }

        setScrollbarOffset(offset);
    };
};

export { useHandleScrollY };
