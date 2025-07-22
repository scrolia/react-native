import { Container } from "#/components/container";
import { ContentX } from "#/components/content/x";
import { ContentY } from "#/components/content/y";
import { ListX } from "#/components/list/x";
import { ListY } from "#/components/list/y";
import { Provider } from "#/components/provider";
import { ThumbX } from "#/components/thumb/x";
import { ThumbY } from "#/components/thumb/y";
import { TrackX } from "#/components/track/x";
import { TrackY } from "#/components/track/y";

/** Scrollbar components. */
const Scrollbar = {
    Provider,
    Container,
    ContentX,
    ContentY,
    ListX,
    ListY,
    TrackX,
    TrackY,
    ThumbX,
    ThumbY,
};

export type {
    OnDragEndOptions,
    OnDragMoveOptions,
    OnDragMoveResult,
    OnDragStartOptions,
    OnScrollOptions,
    OnScrollResult,
    OnSetLengthOptions,
    OnSetLengthResult,
    Options,
    Plugin,
    PluginProps,
    PluginPropsFunction,
    Position,
} from "#/@types/options";
export type { ContainerProps } from "#/components/container";
export type { ContentXProps } from "#/components/content/x";
export type { ContentYProps } from "#/components/content/y";
export type { ProviderProps } from "#/components/provider";
export type { ThumbXProps } from "#/components/thumb/x";
export type { ThumbYProps } from "#/components/thumb/y";
export type { TrackXProps } from "#/components/track/x";
export type { TrackYProps } from "#/components/track/y";

export { Scrollbar };
