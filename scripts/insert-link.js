import * as path from "node:path";

import { MarkdownPageEvent } from "typedoc-plugin-markdown";

/**
 * @param {import("typedoc-plugin-markdown").MarkdownApplication} app
 */
export const load = (app) => {
    app.renderer.on(MarkdownPageEvent.END, insert);
};

const reactNative = path.resolve(
    process.cwd(),
    "..",
    "..",
    "apis",
    "react-native",
    "README.md",
);

const reactNativeFlashList = path.resolve(
    process.cwd(),
    "..",
    "..",
    "apis",
    "react-native-flash-list",
    "README.md",
);

const reactNativeReanimated = path.resolve(
    process.cwd(),
    "..",
    "..",
    "apis",
    "react-native-reanimated",
    "README.md",
);

/**
 * @param {import("typedoc-plugin-markdown").MarkdownPageEvent} page
 */
const insert = (page) => {
    if (
        page.filename === reactNative ||
        page.filename === reactNativeFlashList ||
        page.filename === reactNativeReanimated
    ) {
        const head = "[< Back](../../README.md)\n\n";
        page.contents = head + page.contents;
    }
};
