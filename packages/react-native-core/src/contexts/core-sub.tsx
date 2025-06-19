"use client";

import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import * as React from "react";

type SubScrollCoreStates = {
    handleLayout: (event: LayoutChangeEvent) => void;
    handleContentSizeChange: (width: number, height: number) => void;
    handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

type SubCoreContextType = {
    x: SubScrollCoreStates;
    y: SubScrollCoreStates;
};

const SubCoreContext: React.Context<SubCoreContextType | null> =
    React.createContext<SubCoreContextType | null>(null);

export type { SubScrollCoreStates, SubCoreContextType };
export { SubCoreContext };
