import type { Format, Partial } from "ts-vista";

import type { ContainerProps } from "#/components/container";
import type { ContentXProps } from "#/components/content/x";
import type { ContentYProps } from "#/components/content/y";
import type { ListXProps } from "#/components/list/x";
import type { ListYProps } from "#/components/list/y";
import type { ThumbXProps } from "#/components/thumb/x";
import type { ThumbYProps } from "#/components/thumb/y";
import type { TrackXProps } from "#/components/track/x";
import type { TrackYProps } from "#/components/track/y";

/** The axis of the scrollbar. */
type Axis = "x" | "y";

type FunctionOptions = {
    /** The axis of the scrollbar. */
    axis: Axis;
    /** Whether the scrollbar is disabled. */
    isDisabled: boolean;
    /** Whether the scrollbar tracks and thumbs are animated. */
    isAnimated: boolean;
    /** Whether both track and thumb are defined. */
    isDefined: boolean;
    /** The total length of the content. */
    total: number;
    /** The visible length of the content. */
    view: number;
    /** The offset of the content. */
    viewOffset: number;
};

type OnSetLengthBaseOptions = {
    /** Previous length of the scrollbar. */
    scrollbarLengthPrev: number;
    /** Next length of the scrollbar, aka the default value. */
    scrollbarLengthNext: number;
};

/** The options for the `onSetLength` function. */
type OnSetLengthOptions = Format<FunctionOptions & OnSetLengthBaseOptions>;

type CompleteOnSetLengthResult = {
    /**
     * The length of the scrollbar.
     *
     * By default, it is `(view / total) * view`.
     */
    scrollbarLength: number;
};

/** The result for the `onSetLength` function. */
type OnSetLengthResult = Format<Partial<CompleteOnSetLengthResult>>;

type OnScrollBaseOptions = {
    /** Previous offset of the scrollbar. */
    scrollbarOffsetPrev: number;
    /** Next offset of the scrollbar, aka the default value. */
    scrollbarOffsetNext: number;
};

/** The options for the `onScroll` function. */
type OnScrollOptions = Format<FunctionOptions & OnScrollBaseOptions>;

type CompleteOnScrollResult = {
    /**
     * The offset of the scrollbar.
     *
     * By default, it is `viewOffset / total * view`.
     */
    scrollbarOffset: number;
};

/** The result for the `onScroll` function. */
type OnScrollResult = Format<Partial<CompleteOnScrollResult>>;

type OnDragStartBaseOptions = {
    /** Current pointer offset. */
    pointerOffset: number;
};

/** The options for the `onDragStart` function. */
type OnDragStartOptions = Format<FunctionOptions & OnDragStartBaseOptions>;

type OnDragMoveBaseOptions = {
    /** Current pointer offset. */
    pointerOffset: number;
    /** View offset on pointer down. */
    viewOffsetInit: number;
    /** Pointer offset on pointer down. */
    pointerOffsetInit: number;
    /** The change of pointer between the current and pointer down. */
    delta: number;
    /** The ratio of the visible length to the total length. */
    ratio: number;
    /** The offset to scroll to, aka the default value. */
    scrollTo: number;
};

/** The options for the `onDragMove` function. */
type OnDragMoveOptions = Format<FunctionOptions & OnDragMoveBaseOptions>;

type CompleteOnDragMoveResult = {
    /**
     * The offset to scroll to.
     *
     * By default, it is `initViewOffset + delta / ratio`.
     */
    scrollTo: number;
};

/** The result for the `onDragMove` function. */
type OnDragMoveResult = Format<Partial<CompleteOnDragMoveResult>>;

type OnDragEndBaseOptions = {
    /** Current pointer offset. */
    pointerOffset: number;
    /** View offset on pointer down. */
    viewOffsetInit: number;
    /** Pointer offset on pointer down. */
    pointerOffsetInit: number;
};

/** The options for the `onDragEnd` function. */
type OnDragEndOptions = Format<FunctionOptions & OnDragEndBaseOptions>;

/** The function to get previous props and return new props. */
type PluginPropsFunction<T> = (prev: T) => T;

type CompletePluginProps<ListX = unknown, ListY = unknown> = {
    container: PluginPropsFunction<ContainerProps>;
    contentX: PluginPropsFunction<ContentXProps>;
    contentY: PluginPropsFunction<ContentYProps>;
    listX: PluginPropsFunction<ListXProps<ListX>>;
    listY: PluginPropsFunction<ListYProps<ListY>>;
    trackX: PluginPropsFunction<TrackXProps>;
    trackY: PluginPropsFunction<TrackYProps>;
    thumbX: PluginPropsFunction<ThumbXProps>;
    thumbY: PluginPropsFunction<ThumbYProps>;
};

/** Scrollbar plugin props. */
type PluginProps = Format<Partial<CompletePluginProps>>;

type CompletePlugin = {
    /** The name of the plugin. */
    name: string;
    /** The props for the scrollbar components. */
    props: PluginProps;
    /** The function to be called when the length of the scrollbar is being set. */
    onSetLength: (options: OnSetLengthOptions) => OnSetLengthResult | undefined;
    /** The function to be called when the scrollbar is being scrolled. */
    onScroll: (options: OnScrollOptions) => OnScrollResult | undefined;
    /** The function to be called when the scrollbar is being dragged. */
    onDragStart: (options: OnDragStartOptions) => void;
    /** The function to be called when the scrollbar is dragged and move. */
    onDragMove: (options: OnDragMoveOptions) => OnDragMoveResult | undefined;
    /** The function to be called when the scrollbar is released. */
    onDragEnd: (options: OnDragEndOptions) => void;
};

/** Scrollbar plugin. */
type Plugin = Format<Partial<CompletePlugin>>;

type CompleteOptions = {
    /**
     * Whether disable the scrollbar.
     *
     * By default, it is `false`.
     */
    disabled: boolean;
    /**
     * Whether use animated tracks and thumbs.
     *
     * By default, it is `false`.
     */
    animated: boolean;
    /**
     * The plugins for the scrollbar.
     *
     * By default, it is `[]`.
     */
    plugins: Plugin[];
};

/** Scrollbar options. */
type Options = Format<Partial<CompleteOptions>>;

export type {
    Axis,
    OnSetLengthOptions,
    OnSetLengthResult,
    OnScrollOptions,
    OnScrollResult,
    OnDragStartOptions,
    OnDragMoveOptions,
    OnDragMoveResult,
    OnDragEndOptions,
    PluginPropsFunction,
    PluginProps,
    Plugin,
    CompleteOptions,
    Options,
};
