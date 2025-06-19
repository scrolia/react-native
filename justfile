set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "./node_modules/.bin/"
biome := node_bin + "biome"
tsc := node_bin + "tsc"
rslib := node_bin + "rslib"
sass := node_bin + "sass"
typedoc := node_bin + "typedoc"

core := "./packages/react-native-core"
core_thumb := "./packages/react-native-core-thumb"
native := "./packages/react-native"
list_flash := "./packages/react-native-flash-list"
thumb_reanimated := "./packages/react-native-reanimated-thumb"

example_common := "./examples/common"
example_list := "./examples/list"
example_list_flash := "./examples/list-flash"
example_thumb_reanimated := "./examples/thumb-reanimated"

# Default action
_:
    just lint
    just fmt

# Install
i:
    pnpm install

# Setup the project
setup:
    brew install ls-lint typos-cli
    just i

# Lint with TypeScript Compiler
tsc:
    cd ./{{core}} && ../../{{tsc}} --noEmit
    cd ./{{core_thumb}} && ../../{{tsc}} --noEmit
    cd ./{{native}} && ../../{{tsc}} --noEmit
    cd ./{{list_flash}} && ../../{{tsc}} --noEmit
    cd ./{{thumb_reanimated}} && ../../{{tsc}} --noEmit

# Lint code
lint:
    ls-lint
    typos
    just tsc

# Format code
fmt:
    ./{{biome}} check --write .

# Build all packages
build:
    cd ./{{core}} && ../../{{rslib}} build
    cd ./{{core_thumb}} && ../../{{rslib}} build
    cd ./{{native}} && ../../{{rslib}} build
    cd ./{{list_flash}} && ../../{{rslib}} build
    cd ./{{thumb_reanimated}} && ../../{{rslib}} build

# Generate APIs documentation
api:
    cd ./{{native}} && ../../{{typedoc}}
    cd ./{{list_flash}} && ../../{{typedoc}}
    cd ./{{thumb_reanimated}} && ../../{{typedoc}}

# Clean builds
clean:
    rm -rf ./{{example_common}}/dist
    rm -rf ./{{example_common}}/.expo
    rm -rf ./{{example_common}}/expo-env.d.ts
    
    rm -rf ./{{example_list}}/dist
    rm -rf ./{{example_list}}/.expo
    rm -rf ./{{example_list}}/expo-env.d.ts

    rm -rf ./{{example_list_flash}}/dist
    rm -rf ./{{example_list_flash}}/.expo
    rm -rf ./{{example_list_flash}}/expo-env.d.ts

    rm -rf ./{{example_thumb_reanimated}}/dist
    rm -rf ./{{example_thumb_reanimated}}/.expo
    rm -rf ./{{example_thumb_reanimated}}/expo-env.d.ts

    rm -rf ./{{thumb_reanimated}}/dist
    rm -rf ./{{list_flash}}/dist
    rm -rf ./{{native}}/dist
    rm -rf ./{{core_thumb}}/dist
    rm -rf ./{{core}}/dist

# Clean everything
clean-all:
    just clean

    rm -rf ./{{example_common}}/node_modules
    rm -rf ./{{example_list}}/node_modules
    rm -rf ./{{example_list_flash}}/node_modules
    rm -rf ./{{example_thumb_reanimated}}/node_modules

    rm -rf ./{{thumb_reanimated}}/node_modules
    rm -rf ./{{list_flash}}/node_modules
    rm -rf ./{{native}}/node_modules
    rm -rf ./{{core_thumb}}/node_modules
    rm -rf ./{{core}}/node_modules

    rm -rf ./node_modules
