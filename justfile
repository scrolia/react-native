set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "./node_modules/.bin/"
biome := node_bin + "biome"
tsc := node_bin + "tsc"
rslib := node_bin + "rslib"
typedoc := node_bin + "typedoc"

native := "packages/react-native"
flashlist := "packages/react-native-flash-list"
reanimated := "packages/react-native-reanimated"

example_common := "examples/react-native"
example_flashlist := "examples/react-native-flash-list"
example_reanimated := "examples/react-native-reanimated"

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
    cd ./{{native}} && ../../{{tsc}} --noEmit
    cd ./{{flashlist}} && ../../{{tsc}} --noEmit
    cd ./{{reanimated}} && ../../{{tsc}} --noEmit

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
    cd ./{{native}} && ../../{{rslib}} build
    cd ./{{flashlist}} && ../../{{rslib}} build
    cd ./{{reanimated}} && ../../{{rslib}} build

# Generate APIs documentation
api:
    cd ./{{native}} && ../../{{typedoc}}
    cd ./{{flashlist}} && ../../{{typedoc}}
    cd ./{{reanimated}} && ../../{{typedoc}}

# Clean builds
clean:
    rm -rf ./{{example_common}}/dist
    rm -rf ./{{example_common}}/.expo
    rm -rf ./{{example_common}}/expo-env.d.ts

    rm -rf ./{{example_flashlist}}/dist
    rm -rf ./{{example_flashlist}}/.expo
    rm -rf ./{{example_flashlist}}/expo-env.d.ts

    rm -rf ./{{example_reanimated}}/dist
    rm -rf ./{{example_reanimated}}/.expo
    rm -rf ./{{example_reanimated}}/expo-env.d.ts

    rm -rf ./{{reanimated}}/dist
    rm -rf ./{{flashlist}}/dist
    rm -rf ./{{native}}/dist

# Clean everything
clean-all:
    just clean

    rm -rf ./{{example_common}}/node_modules
    rm -rf ./{{example_flashlist}}/node_modules
    rm -rf ./{{example_reanimated}}/node_modules

    rm -rf ./{{reanimated}}/node_modules
    rm -rf ./{{flashlist}}/node_modules
    rm -rf ./{{native}}/node_modules

    rm -rf ./node_modules
