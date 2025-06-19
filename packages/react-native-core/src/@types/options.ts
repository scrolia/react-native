import type { Format, Omit, Partial } from "ts-vista";

type CompleteThumbColor = {
    /**
     * Base color of the thumb.
     *
     * By default, it is `#99999955`.
     */
    base: string;
    /**
     * Color of the thumb when hover.
     *
     * By default, it is `#99999977`.
     */
    hover: string;
    /**
     * Color of the thumb when press.
     *
     * By default, it is `#99999999`.
     */
    press: string;
};

/** Color configuration of the thumb. */
type ThumbColor = Format<Partial<CompleteThumbColor>>;

type SharedIndividualOptions = {
    /**
     * Color configuration of the thumb.
     *
     * For more information, please refrer to the `ThumbColor` type.
     */
    thumbColor: CompleteThumbColor;
    /**
     * Set the length of the scrollbar.
     *
     * By default, it match with the default style.
     */
    setScrollbarLength: (length: number) => number;
};

type OnActiveOptions = {
    /**
     * Whether the scrollbar is active or not.
     */
    isActive: boolean;
};

type IndividualOptionsBase = {
    /**
     * Triggered on scrollbar active state change.
     */
    onActive: (options: OnActiveOptions) => void;
};

type CompleteIndividualOptions = SharedIndividualOptions &
    IndividualOptionsBase;

/** Individual options for each axis. */
type IndividualOptions = Format<
    Partial<
        Omit<CompleteIndividualOptions, "thumbColor"> & {
            /**
             * Color configuration of the thumb.
             *
             * For more information, please refrer to the `ThumbColor` type.
             */
            thumbColor: ThumbColor;
        }
    >
>;

type CompleteOptionsBase = {
    /**
     * Whether disable the scrollbar.
     *
     * By default, it is `false`.
     */
    disabled: boolean;
    /**
     * Whether enable headless mode.
     *
     * By default, it is `false`.
     */
    headless: boolean;
    /**
     * Whether to disable the animation.
     *
     * This option will disable the animation
     * like thumb's background color and opacity.
     *
     * By default, it is `false`.
     */
    noAnimation: boolean;
    /**
     * Whether to use native driver for animation.
     *
     * By default, it is `Platform.OS !== "web"`.
     */
    useNativeDriver: boolean;
};

type CompleteOptions = Format<
    CompleteOptionsBase &
        SharedIndividualOptions & {
            /**
             * Individual options for horizontal scrollbar.
             */
            x: CompleteIndividualOptions;
            /**
             * Individual options for vertical scrollbar.
             */
            y: CompleteIndividualOptions;
        }
>;

/** Scrollbar options. */
type Options = Format<
    Partial<
        Omit<CompleteOptions, "thumbColor" | "x" | "y"> & {
            /** Color of the thumb. */
            thumbColor: ThumbColor;
            /**
             * Individual options for horizontal scrollbar.
             */
            x: IndividualOptions;
            /**
             * Individual options for vertical scrollbar.
             */
            y: IndividualOptions;
        }
    >
>;

export type {
    CompleteThumbColor,
    ThumbColor,
    SharedIndividualOptions,
    OnActiveOptions,
    IndividualOptionsBase,
    CompleteIndividualOptions,
    IndividualOptions,
    CompleteOptionsBase,
    CompleteOptions,
    Options,
};
