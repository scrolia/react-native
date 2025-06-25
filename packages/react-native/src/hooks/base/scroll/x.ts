import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import type { OnScrollResult } from "#/@types/options";

import { useScrollCore } from "#/contexts/scrollcore";

const pos = "x" as const;

const useHandleScrollX = () => {
    const {
        options: { disabled, animated, onScroll },
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

        const result: OnScrollResult | undefined = onScroll?.({
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

        let offset: number;

        if (result?.scrollbarOffset) {
            offset = result.scrollbarOffset;
        } else {
            offset = scrollbarOffsetNext;
        }

        setScrollbarOffset(offset);
    };
};

export { useHandleScrollX };
