"use client";

import type { Format } from "ts-vista";

import type { Options } from "#/@types/options";
import type { ContentType } from "#/contexts/scrollcore";

import * as React from "react";

import { ScrollCoreContext } from "#/contexts/scrollcore";

/** Props for the `Provider` component. */
type ProviderProps = Format<
    Options & {
        children?: React.ReactNode;
    }
>;

/** Provider component. */
const Provider = (props: ProviderProps): React.JSX.Element => {
    const { children, ...p } = props;

    const contentTypeX = React.useRef<ContentType>("scrollview");
    const contentTypeY = React.useRef<ContentType>("scrollview");

    const contentRefX = React.useRef<HTMLDivElement | null>(null);
    const contentRefY = React.useRef<HTMLDivElement | null>(null);

    const [hvTrackX, setHvTrackX] = React.useState<boolean>(false);
    const [hvThumbX, setHvThumbX] = React.useState<boolean>(false);
    const [hvTrackY, setHvTrackY] = React.useState<boolean>(false);
    const [hvThumbY, setHvThumbY] = React.useState<boolean>(false);

    const totalX = React.useRef<number>(0);
    const totalY = React.useRef<number>(0);

    const viewX = React.useRef<number>(0);
    const viewY = React.useRef<number>(0);

    const viewOffsetX = React.useRef<number>(0);
    const viewOffsetY = React.useRef<number>(0);

    const [scrollbarLengthX, setScrollbarLengthX] = React.useState<number>(0);
    const [scrollbarLengthY, setScrollbarLengthY] = React.useState<number>(0);

    const [scrollbarOffsetX, setScrollbarOffsetX] = React.useState<number>(0);
    const [scrollbarOffsetY, setScrollbarOffsetY] = React.useState<number>(0);

    return (
        <ScrollCoreContext
            value={{
                options: {
                    ...p,
                    disabled: p.disabled ?? false,
                    animated: p.animated ?? false,
                    plugins: p.plugins ?? [],
                },
                x: {
                    contentType: contentTypeX,
                    contentRef: contentRefX,
                    hvTrack: hvTrackX,
                    setHvTrack: setHvTrackX,
                    hvThumb: hvThumbX,
                    setHvThumb: setHvThumbX,
                    total: totalX,
                    view: viewX,
                    viewOffset: viewOffsetX,
                    scrollbarLength: scrollbarLengthX,
                    setScrollbarLength: setScrollbarLengthX,
                    scrollbarOffset: scrollbarOffsetX,
                    setScrollbarOffset: setScrollbarOffsetX,
                },
                y: {
                    contentType: contentTypeY,
                    contentRef: contentRefY,
                    hvTrack: hvTrackY,
                    setHvTrack: setHvTrackY,
                    hvThumb: hvThumbY,
                    setHvThumb: setHvThumbY,
                    total: totalY,
                    view: viewY,
                    viewOffset: viewOffsetY,
                    scrollbarLength: scrollbarLengthY,
                    setScrollbarLength: setScrollbarLengthY,
                    scrollbarOffset: scrollbarOffsetY,
                    setScrollbarOffset: setScrollbarOffsetY,
                },
            }}
        >
            {children}
        </ScrollCoreContext>
    );
};

export type { ProviderProps };
export { Provider };
