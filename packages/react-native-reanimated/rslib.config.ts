import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
    lib: [
        {
            format: "esm",
            bundle: false,
            output: {
                distPath: {
                    root: "./dist",
                },
            },
        },
        {
            format: "cjs",
            bundle: false,
            dts: {
                distPath: "./dist",
            },
            output: {
                distPath: {
                    root: "./dist",
                },
            },
        },
    ],
    source: {
        tsconfigPath: "./tsconfig.json",
    },
    output: {
        sourceMap: true,
        target: "web",
    },
    plugins: [
        pluginReact(),
    ],
});
