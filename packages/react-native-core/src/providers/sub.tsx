"use client";

import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import type { CoreContextType } from "#/contexts/core";

import * as React from "react";

import { useCoreContext } from "#/contexts/core";
import { SubCoreContext } from "#/contexts/core-sub";

type SubProps = {
    children: React.ReactNode;
};

const Sub = (props: SubProps): React.JSX.Element => {
    const core: CoreContextType = useCoreContext();

    const isInitScrollX = React.useRef<boolean>(false);
    const isInitScrollY = React.useRef<boolean>(false);

    React.useEffect((): void => {
        if (!isInitScrollX.current) return void 0;

        core.x.options.onActive?.({
            isActive: core.x.isActive,
        });
    }, [
        core.x.options.onActive,
        core.x.isActive,
    ]);

    React.useEffect((): void => {
        if (!isInitScrollY.current) return void 0;

        core.y.options.onActive?.({
            isActive: core.y.isActive,
        });
    }, [
        core.y.options.onActive,
        core.y.isActive,
    ]);

    const setLengthX = (): void => {
        const { total, view, setScrollbarLength } = core.x;

        const _total: number = total.current;
        const _view: number = view.current;

        // set length var
        const lengthRaw: number = (_view / _total) * _view;
        const length: number = core.x.options.setScrollbarLength(lengthRaw);

        // set length
        if (_view >= _total) {
            setScrollbarLength(0);
        } else {
            setScrollbarLength(length);
        }
    };

    const setLengthY = (): void => {
        const { total, view, setScrollbarLength } = core.y;

        const _total: number = total.current;
        const _view: number = view.current;

        // set length var
        const lengthRaw: number = (_view / _total) * _view;
        const length: number = core.y.options.setScrollbarLength(lengthRaw);

        // set length
        if (_view >= _total) {
            setScrollbarLength(0);
        } else {
            setScrollbarLength(length);
        }
    };

    const handleLayoutX = (event: LayoutChangeEvent): void => {
        core.x.view.current = event.nativeEvent.layout.width;
        setLengthX();
    };

    const handleLayoutY = (event: LayoutChangeEvent): void => {
        core.y.view.current = event.nativeEvent.layout.height;
        setLengthY();
    };

    const handleContentSizeChangeX = (width: number, _height: number): void => {
        core.x.total.current = width;
        setLengthX();
    };

    const handleContentSizeChangeY = (_width: number, height: number): void => {
        core.y.total.current = height;
        setLengthY();
    };

    const handleScrollX = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ): void => {
        if (!isInitScrollX.current) isInitScrollX.current = true;

        // declarations
        const {
            total,
            view,
            viewOffset,
            setScrollbarOffset,
            timeout,
            setIsActive,
        } = core.x;
        const {
            // contentSize,
            // layoutMeasurement,
            contentOffset,
        } = event.nativeEvent;

        // total.current = contentSize.width;
        // view.current = layoutMeasurement.width;
        viewOffset.current = contentOffset.x;

        setScrollbarOffset((viewOffset.current / total.current) * view.current);

        if (timeout.current) clearTimeout(timeout.current);

        setIsActive(true);

        timeout.current = setTimeout((): void => setIsActive(false), 1000);
    };

    const handleScrollY = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ): void => {
        if (!isInitScrollY.current) isInitScrollY.current = true;

        // declarations
        const {
            total,
            view,
            viewOffset,
            setScrollbarOffset,
            timeout,
            setIsActive,
        } = core.y;
        const {
            // contentSize,
            // layoutMeasurement,
            contentOffset,
        } = event.nativeEvent;

        // total.current = contentSize.height;
        // view.current = layoutMeasurement.height;
        viewOffset.current = contentOffset.y;

        setScrollbarOffset((viewOffset.current / total.current) * view.current);

        if (timeout.current) clearTimeout(timeout.current);

        setIsActive(true);

        timeout.current = setTimeout((): void => setIsActive(false), 1000);
    };

    return (
        <>
            <SubCoreContext.Provider
                value={{
                    x: {
                        handleLayout: handleLayoutX,
                        handleContentSizeChange: handleContentSizeChangeX,
                        handleScroll: handleScrollX,
                    },
                    y: {
                        handleLayout: handleLayoutY,
                        handleContentSizeChange: handleContentSizeChangeY,
                        handleScroll: handleScrollY,
                    },
                }}
            >
                {props.children}
            </SubCoreContext.Provider>
        </>
    );
};

export type { SubProps };
export { Sub };
