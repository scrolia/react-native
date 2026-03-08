"use client";

import type { CompleteOptions } from "#/@types/options";

import * as React from "react";

/** Options for the `ScrollCore` context. */
type ScrollCoreOptions = CompleteOptions;

/** Content type. */
type ContentType = "scrollview" | "flatlist";

/** States for the `ScrollCore` context. */
type ScrollCoreStates = {
    contentType: React.RefObject<ContentType>;
    contentRef: React.RefObject<any | null>;
    hvTrack: boolean;
    setHvTrack: React.Dispatch<React.SetStateAction<boolean>>;
    hvThumb: boolean;
    setHvThumb: React.Dispatch<React.SetStateAction<boolean>>;
    total: React.RefObject<number>;
    view: React.RefObject<number>;
    viewOffset: React.RefObject<number>;
    scrollbarLength: number;
    setScrollbarLength: React.Dispatch<React.SetStateAction<number>>;
    scrollbarOffset: number;
    setScrollbarOffset: React.Dispatch<React.SetStateAction<number>>;
};

const useScrollCoreStates = (): ScrollCoreStates => {
    const contentType = React.useRef<ContentType>("scrollview");

    const contentRef = React.useRef<any | null>(null);

    const [hvTrack, setHvTrack] = React.useState<boolean>(false);
    const [hvThumb, setHvThumb] = React.useState<boolean>(false);

    const total = React.useRef<number>(0);

    const view = React.useRef<number>(0);

    const viewOffset = React.useRef<number>(0);

    const [scrollbarLength, setScrollbarLength] = React.useState<number>(0);

    const [scrollbarOffset, setScrollbarOffset] = React.useState<number>(0);

    return {
        contentType,
        contentRef,
        hvTrack,
        setHvTrack,
        hvThumb,
        setHvThumb,
        total,
        view,
        viewOffset,
        scrollbarLength,
        setScrollbarLength,
        scrollbarOffset,
        setScrollbarOffset,
    };
};

/** Core for internal logic. */
type ScrollCore = {
    options: ScrollCoreOptions;
    x: ScrollCoreStates;
    y: ScrollCoreStates;
};

/** `ScrollCore` context. */
const ScrollCoreContext: React.Context<ScrollCore | null> =
    React.createContext<ScrollCore | null>(null);

/** Hook for using the `ScrollCore` context. */
const useScrollCore = (): ScrollCore => {
    const core: ScrollCore | null = React.useContext(ScrollCoreContext);

    if (core === null) {
        throw new Error("useScrollCore must be used within a provider");
    }

    return core;
};

export type { ScrollCoreOptions, ContentType, ScrollCoreStates, ScrollCore };
export { useScrollCoreStates, ScrollCoreContext, useScrollCore };
