const config = (api) => {
    // cache
    api.cache(true);

    // return
    return {
        presets: [
            "babel-preset-expo",
        ],
        plugins: [
            // transfer react-native-reanimated to web
            "@babel/plugin-transform-export-namespace-from",
            "react-native-reanimated/plugin",
        ],
    };
};

module.exports = config;
