"use client";

import type { Format, Partial } from "ts-vista";

import type {
    CompleteOptionsBase,
    IndividualOptionsBase,
    SharedIndividualOptions,
} from "#/@types/options";
import type { ElType } from "#/@types/states";

import * as React from "react";

type ScrollCoreStatesOptions = Format<
    SharedIndividualOptions & Partial<IndividualOptionsBase>
>;

type ScrollCoreStates = {
    options: ScrollCoreStatesOptions;
    elType: React.MutableRefObject<ElType>;
    elRef: React.MutableRefObject<any | null>;
    hvTrack: boolean;
    setHvTrack: React.Dispatch<React.SetStateAction<boolean>>;
    hvThumb: boolean;
    setHvThumb: React.Dispatch<React.SetStateAction<boolean>>;
    timeout: React.MutableRefObject<NodeJS.Timeout | null>;
    total: React.MutableRefObject<number>;
    view: React.MutableRefObject<number>;
    viewOffset: React.MutableRefObject<number>;
    scrollbarLength: number;
    setScrollbarLength: React.Dispatch<React.SetStateAction<number>>;
    scrollbarOffset: number;
    setScrollbarOffset: React.Dispatch<React.SetStateAction<number>>;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    trackHover: boolean;
    setTrackHover: React.Dispatch<React.SetStateAction<boolean>>;
    thumbHover: boolean;
    setThumbHover: React.Dispatch<React.SetStateAction<boolean>>;
    dragRef: React.MutableRefObject<boolean>;
    drag: boolean;
    setDrag: React.Dispatch<React.SetStateAction<boolean>>;
};

type ScrollCoreOptions = CompleteOptionsBase;

type CoreContextType = {
    options: ScrollCoreOptions;
    x: ScrollCoreStates;
    y: ScrollCoreStates;
};

const CoreContext: React.Context<CoreContextType | null> =
    React.createContext<CoreContextType | null>(null);

const useCoreContext = (): CoreContextType => {
    const core: CoreContextType | null = React.useContext(CoreContext);

    if (core === null) {
        throw new Error(
            "useCoreContext must be used within a CoreContext Provider",
        );
    }

    return core;
};

export type {
    ScrollCoreStatesOptions,
    ScrollCoreStates,
    ScrollCoreOptions,
    CoreContextType,
};
export { CoreContext, useCoreContext };
