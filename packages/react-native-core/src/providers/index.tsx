"use client";

import type { ScrollView } from "react-native";

import type { Options } from "#/@types/options";
import type { ElType } from "#/@types/states";
import type {
    ScrollCoreOptions,
    ScrollCoreStatesOptions,
} from "#/contexts/core";

import * as React from "react";
import { Platform } from "react-native";

import { MARGIN } from "#/configs";
import { CoreContext } from "#/contexts/core";
import { Sub } from "#/providers/sub";

type ScrollCoreProviderProps = {
    options: Options;
    children: React.ReactNode;
};

const defaultIndivOptions: ScrollCoreStatesOptions = {
    thumbColor: {
        base: "#99999955",
        hover: "#99999977",
        press: "#99999999",
    },
    setScrollbarLength: (length: number): number => {
        return Math.max(10, length - MARGIN);
    },
};

const ScrollCoreProvider = (
    props: ScrollCoreProviderProps,
): React.JSX.Element => {
    const {
        options: { x, y, thumbColor, setScrollbarLength, ...o },
        children,
    } = props;

    const options: ScrollCoreOptions = {
        disabled: o.disabled ?? false,
        headless: o.headless ?? false,
        noAnimation: o.noAnimation ?? false,
        useNativeDriver: o.useNativeDriver ?? Platform.OS !== "web",
    };

    const indivOptionsX: ScrollCoreStatesOptions = {
        ...x,
        thumbColor: {
            base:
                x?.thumbColor?.base ??
                thumbColor?.base ??
                defaultIndivOptions.thumbColor.base,
            hover:
                x?.thumbColor?.hover ??
                thumbColor?.hover ??
                defaultIndivOptions.thumbColor.hover,
            press:
                x?.thumbColor?.press ??
                thumbColor?.press ??
                defaultIndivOptions.thumbColor.press,
        },
        setScrollbarLength:
            x?.setScrollbarLength ??
            setScrollbarLength ??
            defaultIndivOptions.setScrollbarLength,
    };

    const indivOptionsY: ScrollCoreStatesOptions = {
        ...y,
        thumbColor: {
            base:
                y?.thumbColor?.base ??
                thumbColor?.base ??
                defaultIndivOptions.thumbColor.base,
            hover:
                y?.thumbColor?.hover ??
                thumbColor?.hover ??
                defaultIndivOptions.thumbColor.hover,
            press:
                y?.thumbColor?.press ??
                thumbColor?.press ??
                defaultIndivOptions.thumbColor.press,
        },
        setScrollbarLength:
            y?.setScrollbarLength ??
            setScrollbarLength ??
            defaultIndivOptions.setScrollbarLength,
    };

    const elXType = React.useRef<ElType>("scrollview");
    const elYType = React.useRef<ElType>("scrollview");

    const elXRef = React.useRef<ScrollView | null>(null);
    const elYRef = React.useRef<ScrollView | null>(null);

    const [hvTrackX, setHvTrackX] = React.useState<boolean>(false);
    const [hvThumbX, setHvThumbX] = React.useState<boolean>(false);
    const [hvTrackY, setHvTrackY] = React.useState<boolean>(false);
    const [hvThumbY, setHvThumbY] = React.useState<boolean>(false);

    const timeoutX = React.useRef<NodeJS.Timeout | null>(null);
    const timeoutY = React.useRef<NodeJS.Timeout | null>(null);

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

    const [isActiveX, setIsActiveX] = React.useState<boolean>(false);
    const [isActiveY, setIsActiveY] = React.useState<boolean>(false);

    // styling

    const [trackXHover, setTrackXHover] = React.useState<boolean>(false);
    const [thumbXHover, setThumbXHover] = React.useState<boolean>(false);

    const [trackYHover, setTrackYHover] = React.useState<boolean>(false);
    const [thumbYHover, setThumbYHover] = React.useState<boolean>(false);

    const dragXRef = React.useRef<boolean>(false);
    const [dragX, setDragX] = React.useState<boolean>(false);

    const dragYRef = React.useRef<boolean>(false);
    const [dragY, setDragY] = React.useState<boolean>(false);

    return (
        <>
            <CoreContext.Provider
                value={{
                    options,
                    x: {
                        options: indivOptionsX,
                        elType: elXType,
                        elRef: elXRef,
                        hvTrack: hvTrackX,
                        setHvTrack: setHvTrackX,
                        hvThumb: hvThumbX,
                        setHvThumb: setHvThumbX,
                        timeout: timeoutX,
                        total: totalX,
                        view: viewX,
                        viewOffset: viewOffsetX,
                        scrollbarLength: scrollbarLengthX,
                        setScrollbarLength: setScrollbarLengthX,
                        scrollbarOffset: scrollbarOffsetX,
                        setScrollbarOffset: setScrollbarOffsetX,
                        isActive: isActiveX,
                        setIsActive: setIsActiveX,
                        trackHover: trackXHover,
                        setTrackHover: setTrackXHover,
                        thumbHover: thumbXHover,
                        setThumbHover: setThumbXHover,
                        dragRef: dragXRef,
                        drag: dragX,
                        setDrag: setDragX,
                    },
                    y: {
                        options: indivOptionsY,
                        elType: elYType,
                        elRef: elYRef,
                        hvTrack: hvTrackY,
                        setHvTrack: setHvTrackY,
                        hvThumb: hvThumbY,
                        setHvThumb: setHvThumbY,
                        timeout: timeoutY,
                        total: totalY,
                        view: viewY,
                        viewOffset: viewOffsetY,
                        scrollbarLength: scrollbarLengthY,
                        setScrollbarLength: setScrollbarLengthY,
                        scrollbarOffset: scrollbarOffsetY,
                        setScrollbarOffset: setScrollbarOffsetY,
                        isActive: isActiveY,
                        setIsActive: setIsActiveY,
                        trackHover: trackYHover,
                        setTrackHover: setTrackYHover,
                        thumbHover: thumbYHover,
                        setThumbHover: setThumbYHover,
                        dragRef: dragYRef,
                        drag: dragY,
                        setDrag: setDragY,
                    },
                }}
            >
                <Sub>{children}</Sub>
            </CoreContext.Provider>
        </>
    );
};

export type { ScrollCoreProviderProps };
export { ScrollCoreProvider };
