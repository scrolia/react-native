import type { OnSetLengthResult } from "#/@types/options";

import { useScrollCore } from "#/contexts/scrollcore";

const pos = "y" as const;

const useSetLengthY = () => {
    const {
        options: { disabled, animated, onSetLength },
        [pos]: {
            hvTrack,
            hvThumb,
            total,
            view,
            viewOffset,
            scrollbarLength,
            setScrollbarLength,
        },
    } = useScrollCore();

    return (): void => {
        const _total: number = total.current;
        const _view: number = view.current;
        const _viewOffset: number = viewOffset.current;

        const scrollbarLengthNext: number = (_view / _total) * _view;

        const result: OnSetLengthResult | undefined = onSetLength?.({
            position: pos,
            isDisabled: disabled,
            isAnimated: animated,
            isDefined: hvTrack && hvThumb,
            total: _total,
            view: _view,
            viewOffset: _viewOffset,
            scrollbarLengthPrev: scrollbarLength,
            scrollbarLengthNext,
        });

        let length: number;

        if (result?.scrollbarLength) {
            length = result.scrollbarLength;
        } else {
            length = scrollbarLengthNext;
        }

        // set length
        if (_view >= _total) {
            setScrollbarLength(0);
        } else {
            setScrollbarLength(length);
        }
    };
};

export { useSetLengthY };
