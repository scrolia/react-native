import type { Axis, OnSetLengthResult, Plugin } from "#/@types/options";

import { tryPlugin } from "#/functions/plugin";

type SetLengthOptions = {
    axis: Axis;
    disabled: boolean;
    animated: boolean;
    plugins: Plugin[];
    hvTrack: boolean;
    hvThumb: boolean;
    total: React.RefObject<number>;
    view: React.RefObject<number>;
    viewOffset: React.RefObject<number>;
    scrollbarLength: number;
    setScrollbarLength: React.Dispatch<React.SetStateAction<number>>;
};

const setLengthFn = ({
    axis,
    disabled,
    animated,
    plugins,
    hvTrack,
    hvThumb,
    total,
    view,
    viewOffset,
    scrollbarLength,
    setScrollbarLength,
}: SetLengthOptions): (() => void) => {
    return (): void => {
        const _total: number = total.current;
        const _view: number = view.current;
        const _viewOffset: number = viewOffset.current;

        const scrollbarLengthNext: number = (_view / _total) * _view;

        let result: OnSetLengthResult | undefined;

        for (const plugin of plugins) {
            if (!plugin.onSetLength) continue;

            result =
                tryPlugin(plugin, plugin.onSetLength, {
                    axis,
                    isDisabled: disabled,
                    isAnimated: animated,
                    isDefined: hvTrack && hvThumb,
                    total: _total,
                    view: _view,
                    viewOffset: _viewOffset,
                    scrollbarLengthPrev: scrollbarLength,
                    scrollbarLengthNext:
                        result?.scrollbarLength ?? scrollbarLengthNext,
                }) ?? result;
        }

        let length: number;

        if (result?.scrollbarLength) {
            length = result.scrollbarLength;
        } else {
            length = scrollbarLengthNext;
        }

        // check if the scrollbar is needed
        if (_view >= _total) {
            setScrollbarLength(0);
        } else {
            setScrollbarLength(length);
        }
    };
};

export type { SetLengthOptions };
export { setLengthFn };
