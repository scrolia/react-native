import type { Plugin } from "#/@types/options";

import { tryPlugin } from "#/functions/plugin";

/** The name of the component. */
type GetComponentPropsName =
    | "container"
    | "contentX"
    | "contentY"
    | "listX"
    | "listY"
    | "trackX"
    | "trackY"
    | "thumbX"
    | "thumbY";

/** The options for `getComponentProps` function. */
type GetComponentPropsOptions<P> = {
    name: GetComponentPropsName;
    props: P;
    plugins: Plugin[];
};

/** The function to get component props with plugins. */
const getComponentProps = <P extends object>(
    options: GetComponentPropsOptions<P>,
): P => {
    const { name, props, plugins } = options;

    let result: P = props;

    for (const plugin of plugins) {
        if (!plugin.props?.[name]) continue;

        result = {
            ...result,
            ...tryPlugin(plugin, plugin.props[name] as any, result as any),
        };
    }

    return result;
};

export type { GetComponentPropsName, GetComponentPropsOptions };
export { getComponentProps };
