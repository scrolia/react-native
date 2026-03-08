"use client";

import type * as React from "react";
import type { Format } from "ts-vista";

import type { Options } from "#/@types/options";
import type { ScrollCoreStates } from "#/contexts/scrollcore";

import { ScrollCoreContext, useScrollCoreStates } from "#/contexts/scrollcore";

/** Props for the `Provider` component. */
type ProviderProps = Format<
    Options & {
        children?: React.ReactNode;
    }
>;

/** Provider component. */
const Provider = (props: ProviderProps): React.JSX.Element => {
    const { children, ...p } = props;

    const x: ScrollCoreStates = useScrollCoreStates();
    const y: ScrollCoreStates = useScrollCoreStates();

    return (
        <ScrollCoreContext
            value={{
                options: {
                    ...p,
                    disabled: p.disabled ?? false,
                    animated: p.animated ?? false,
                    plugins: p.plugins ?? [],
                },
                x,
                y,
            }}
        >
            {children}
        </ScrollCoreContext>
    );
};

export type { ProviderProps };
export { Provider };
