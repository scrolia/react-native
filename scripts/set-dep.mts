import fs from "node:fs";

const path: string = process.argv[2];

const content: string = fs.readFileSync(path, "utf-8");

if (content.includes('"@shopify/flash-list": "')) {
    const updatedContent: string = content.replace(
        /"@shopify\/flash-list":\s*"(.*?)"/,
        '"@shopify/flash-list": "catalog:dev"',
    );

    fs.writeFileSync(path, updatedContent, "utf-8");
}

if (content.includes('"react-native-reanimated": "')) {
    const updatedContent: string = content.replace(
        /"react-native-reanimated":\s*"(.*?)"/,
        '"react-native-reanimated": "catalog:dev"',
    );

    fs.writeFileSync(path, updatedContent, "utf-8");
}
