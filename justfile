set shell := ["bash", "-cu"]
set windows-shell := ["powershell"]

node_bin := "./node_modules/.bin/"
biome := node_bin + "biome"
tsc := node_bin + "tsc"
tsdown := node_bin + "tsdown"
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
    cd ./{{native}} && ../../{{tsdown}} -c ./tsdown.config.ts
    cd ./{{flashlist}} && ../../{{tsdown}} -c ./tsdown.config.ts
    cd ./{{reanimated}} && ../../{{tsdown}} -c ./tsdown.config.ts

# Generate APIs documentation
api:
    cd ./{{native}} && ../../{{typedoc}}
    cd ./{{flashlist}} && ../../{{typedoc}}
    cd ./{{reanimated}} && ../../{{typedoc}}

# Start common example in development mode
example-common:
    cd ./{{example_common}} && pnpm run dev

# Build common example
example-common-build:
    cd ./{{example_common}} && pnpm run build

# Start common example in production mode
example-common-start:
    cd ./{{example_common}} && pnpm run start

# Start flashlist example in development mode
example-flashlist:
    cd ./{{example_flashlist}} && pnpm run dev

# Build flashlist example
example-flashlist-build:
    cd ./{{example_flashlist}} && pnpm run build

# Start flashlist example in production mode
example-flashlist-start:
    cd ./{{example_flashlist}} && pnpm run start

# Start reanimated example in development mode
example-reanimated:
    cd ./{{example_reanimated}} && pnpm run dev

# Build reanimated example
example-reanimated-build:
    cd ./{{example_reanimated}} && pnpm run build

# Start reanimated example in production mode
example-reanimated-start:
    cd ./{{example_reanimated}} && pnpm run start

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
