import { Provider } from "@scrolia/react-native-core";

import { Container } from "#/components/container";
import { ContentX } from "#/components/content/x";
import { ContentY } from "#/components/content/y";
import { ListX } from "#/components/list/x";
import { ListY } from "#/components/list/y";
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
    Position,
    ProviderProps,
    ScrollCore,
    ScrollCoreOptions,
    ScrollCoreStates,
} from "@scrolia/react-native-core";

export {
    ScrollCoreContext,
    useScrollCore,
} from "@scrolia/react-native-core";

export { Scrollbar };
