import fs from "node:fs";

const path: string = process.argv[2];

const ver: string = process.argv[3];

const content: string = fs.readFileSync(path, "utf-8");

const updated: string = content.replace(
    /\b(\d+\.\d+\.\d+)(-dev\.\d+)?\b/g,
    (_match: string, base: string, devSuffix: string | undefined): string => {
        if (!ver) return base;
        return devSuffix ? base : `${base}-dev.${ver}`;
    },
);

fs.writeFileSync(path, updated, "utf-8");
