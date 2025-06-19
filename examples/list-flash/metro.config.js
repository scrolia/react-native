// Configuration for resolving local packages in a monorepo,
// which is unnecessary for standalone projects.

const path = require("node:path");

const { getDefaultConfig } = require("expo/metro-config");

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
    core: path.join(monoRepoRoot, "packages", "react-native-core"),
    thumb: path.join(monoRepoRoot, "packages", "react-native-core-thumb"),
    scrolia: path.join(monoRepoRoot, "packages", "react-native"),
    flash_list: path.join(monoRepoRoot, "packages", "react-native-flash-list"),
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

module.exports = config;
