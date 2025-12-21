import { defineConfig } from "@apst/tsdown";
import { cjsPreset, dtsPreset, esmPreset } from "@apst/tsdown/presets";

export default defineConfig(
    {
        entry: {
            // public
            index: "./src/index.ts",
            // internal
            "contexts/scrollcore": "./src/contexts/scrollcore.ts",
            "functions/props": "./src/functions/props.ts",
            "hooks/content/index": "./src/hooks/content/index.ts",
            "hooks/thumb/index": "./src/hooks/thumb/index.ts",
        },
        platform: "browser",
    },
    [
        esmPreset(),
        cjsPreset(),
        dtsPreset(),
    ],
);
