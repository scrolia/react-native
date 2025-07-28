import type { Options } from "tsdown";

import { defineConfig } from "tsdown";

const options: Options = {
    entry: {
        // public
        index: "./src/index.ts",
        // internal
        "contexts/scrollcore": "./src/contexts/scrollcore.ts",
        "functions/props": "./src/functions/props.ts",
        "hooks/content/index": "./src/hooks/content/index.ts",
        "hooks/thumb/index": "./src/hooks/thumb/index.ts",
    },
    dts: false,
    outDir: "./dist",
    clean: true,
    platform: "browser",
    treeshake: true,
    sourcemap: true,
    minify: false,
    shims: true,
    unbundle: true,
    inputOptions: {
        experimental: {
            attachDebugInfo: "none",
        },
    },
};

export default defineConfig([
    {
        ...options,
        format: "esm",
    },
    {
        ...options,
        dts: true,
        format: "cjs",
    },
]);
