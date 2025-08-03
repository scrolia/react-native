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

# Update dependencies in examples
update-example:
    cd ./{{example_common}} && pnpm dlx expo install expo@latest && pnpm dlx expo install --fix
    cd ./{{example_flashlist}} && pnpm dlx expo install expo@latest && pnpm dlx expo install --fix
    node ./scripts/set-dep.mts ./{{example_flashlist}}/package.json
    cd ./{{example_reanimated}} && pnpm dlx expo install expo@latest && pnpm dlx expo install --fix
    node ./scripts/set-dep.mts ./{{example_reanimated}}/package.json
    just i

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

# Add/Remove dev version tag for native package
version-dev-native VERSION="":
    node ./scripts/version-dev.mts ./{{native}}/package.json {{VERSION}}

# Add/Remove dev version tag for flashlist package
version-dev-flashlist VERSION="":
    node ./scripts/version-dev.mts ./{{flashlist}}/package.json {{VERSION}}

# Add/Remove dev version tag for reanimated package
version-dev-reanimated VERSION="":
    node ./scripts/version-dev.mts ./{{reanimated}}/package.json {{VERSION}}

# Add/Remove dev version tag
version-dev VERSION="":
    just version-dev-native {{VERSION}}
    just version-dev-flashlist {{VERSION}}
    just version-dev-reanimated {{VERSION}}

# Publish react-native package with dev tag as dry-run
publish-dev-try-native:
    cd ./{{native}} && pnpm publish --no-git-checks --tag dev --dry-run

# Publish flashlist package with dev tag as dry-run
publish-dev-try-flashlist:
    cd ./{{flashlist}} && pnpm publish --no-git-checks --tag dev --dry-run

# Publish reanimated package with dev tag as dry-run
publish-dev-try-reanimated:
    cd ./{{reanimated}} && pnpm publish --no-git-checks --tag dev --dry-run

# Publish all packages with dev tag
publish-dev-try:
    just publish-dev-try-native
    just publish-dev-try-flashlist
    just publish-dev-try-reanimated

# Publish react-native package with dev tag
publish-dev-native:
    cd ./{{native}} && pnpm publish --no-git-checks --tag dev

# Publish flashlist package with dev tag
publish-dev-flashlist:
    cd ./{{flashlist}} && pnpm publish --no-git-checks --tag dev

# Publish reanimated package with dev tag
publish-dev-reanimated:
    cd ./{{reanimated}} && pnpm publish --no-git-checks --tag dev

# Publish all packages with dev tag
publish-dev:
    just publish-dev-native
    just publish-dev-flashlist
    just publish-dev-reanimated

# Publish react-native package as dry-run
publish-prd-try-native:
    cd ./{{native}} && pnpm publish --no-git-checks --dry-run

# Publish flashlist package as dry-run
publish-prd-try-flashlist:
    cd ./{{flashlist}} && pnpm publish --no-git-checks --dry-run

# Publish reanimated package as dry-run
publish-prd-try-reanimated:
    cd ./{{reanimated}} && pnpm publish --no-git-checks --dry-run

# Publish all packages as dry-run
publish-prd-try:
    just publish-try-native
    just publish-try-flashlist
    just publish-try-reanimated

# Publish react-native package
publish-prd-native:
    cd ./{{native}} && pnpm publish

# Publish flashlist package
publish-prd-flashlist:
    cd ./{{flashlist}} && pnpm publish

# Publish reanimated package
publish-prd-reanimated:
    cd ./{{reanimated}} && pnpm publish

# Publish all packages
publish-prd:
    just publish-prd-native
    just publish-prd-flashlist
    just publish-prd-reanimated

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
