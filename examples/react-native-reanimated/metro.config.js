// Configuration for resolving local packages in a monorepo,
// which is unnecessary for standalone projects.

const path = require("node:path");

const { getDefaultConfig } = require("expo/metro-config");
const {
    wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

// root
const projectRoot = __dirname;
const monoRepoRoot = path.resolve(projectRoot, "../..");

// node_modules
const projectNodeModules = path.join(projectRoot, "node_modules");
const monorepoNodeModules = path.join(monoRepoRoot, "node_modules");

// default configs
const dConfig = getDefaultConfig(projectRoot);

// monorepo packages
const monorepoPackages = {
    scrolia: path.join(monoRepoRoot, "packages", "react-native"),
    reanimated: path.join(monoRepoRoot, "packages", "react-native-reanimated"),
};

// config
const config = {
    ...dConfig,
    watchFolders: [
        monorepoNodeModules,
        projectRoot,
        ...Object.values(monorepoPackages),
    ],
    resolver: {
        ...dConfig.resolver,
        nodeModulesPaths: [
            projectNodeModules,
            monorepoNodeModules,
        ],
        extraNodeModules: monorepoPackages,
        sourceExts: [
            ...(dConfig.resolver?.sourceExts ?? []),
            "mjs",
            "cjs",
        ],
    },
};

module.exports = wrapWithReanimatedMetroConfig(config);
