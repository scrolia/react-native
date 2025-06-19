import type { Format } from "ts-vista";

import * as React from "react";

import {
    type ScrollCoreStates as _ScrollCoreStates,
    CoreContext,
    type CoreContextType,
    type ScrollCoreOptions,
} from "#/contexts/core";
import {
    SubCoreContext,
    type SubCoreContextType,
    type SubScrollCoreStates,
} from "#/contexts/core-sub";

type ScrollCoreStates = Format<_ScrollCoreStates & SubScrollCoreStates>;

type ScrollCore = {
    options: ScrollCoreOptions;
    x: ScrollCoreStates;
    y: ScrollCoreStates;
};

const useScrollCore = (): ScrollCore => {
    const core: CoreContextType | null = React.useContext(CoreContext);
    const coreSub: SubCoreContextType | null = React.useContext(SubCoreContext);

    if (core === null || coreSub === null) {
        throw new Error("useCore must be used within a CoreProvider");
    }

    return {
        options: core.options,
        x: {
            ...core.x,
            ...coreSub.x,
        },
        y: {
            ...core.y,
            ...coreSub.y,
        },
    };
};

export type { ScrollCoreStates, ScrollCore };
export { useScrollCore };
