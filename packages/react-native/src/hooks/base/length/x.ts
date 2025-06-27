import type { OnSetLengthResult } from "#/@types/options";

import { useScrollCore } from "#/contexts/scrollcore";

const pos = "x" as const;

const useSetLengthX = () => {
    const {
        options: { disabled, animated, plugins },
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

        let result: OnSetLengthResult | undefined;

        for (const plugin of plugins) {
            result = plugin.onSetLength?.({
                position: pos,
                isDisabled: disabled,
                isAnimated: animated,
                isDefined: hvTrack && hvThumb,
                total: _total,
                view: _view,
                viewOffset: _viewOffset,
                scrollbarLengthPrev: scrollbarLength,
                scrollbarLengthNext:
                    result?.scrollbarLength ?? scrollbarLengthNext,
            });
        }

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

export { useSetLengthX };
