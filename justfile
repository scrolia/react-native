set shell := ["bash", "-cu"]
set windows-shell := ["pwsh", "-Command"]

tsc := "pnpm exec tsgo"
biome := "pnpm exec biome"
tsdown := "pnpm exec tsdown"
vitest := "pnpm exec vitest"
typedoc := "pnpm exec typedoc"

lsl_cfg := "-config ../../../.ls-lint.yaml"

dev := "pnpm dev"
build := "pnpm build"
start := "pnpm start"
preview := "pnpm preview"
publish := "pnpm publish"

native := "packages/react-native"
flashlist := "packages/react-native-flash-list"
legnedlist := "packages/react-native-legend-list"
reanimated := "packages/react-native-reanimated"

example_common := "examples/react-native"
example_flashlist := "examples/react-native-flash-list"
example_legendlist := "examples/react-native-legend-list"
example_reanimated := "examples/react-native-reanimated"

# Default action
_:
    just lint
    just fmt

# Install
i:
    pnpm install

# Lint with ls-lint
lslint:
    cd ./{{native}}/src && ls-lint {{lsl_cfg}}
    cd ./{{flashlist}}/src && ls-lint {{lsl_cfg}}
    cd ./{{legnedlist}}/src && ls-lint {{lsl_cfg}}
    cd ./{{reanimated}}/src && ls-lint {{lsl_cfg}}

# Lint with TypeScript Compiler
tsc:
    cd ./{{native}} && {{tsc}} --noEmit
    cd ./{{flashlist}} && {{tsc}} --noEmit
    cd ./{{legnedlist}} && {{tsc}} --noEmit
    cd ./{{reanimated}} && {{tsc}} --noEmit

# Lint code
lint:
    just lslint
    typos
    just tsc

# Lint code with Biome
lint-biome:
    {{biome}} lint .

# Format code
fmt:
    {{biome}} check --write .

# Build all packages
build:
    cd ./{{native}} && {{tsdown}} -c ./tsdown.config.ts
    cd ./{{flashlist}} && {{tsdown}} -c ./tsdown.config.ts
    cd ./{{legnedlist}} && {{tsdown}} -c ./tsdown.config.ts
    cd ./{{reanimated}} && {{tsdown}} -c ./tsdown.config.ts

# Generate APIs documentation
api:
    cd ./{{native}} && {{typedoc}}
    cd ./{{flashlist}} && {{typedoc}}
    cd ./{{legnedlist}} && {{typedoc}}
    cd ./{{reanimated}} && {{typedoc}}

# Update dependencies in examples
update-example:
    cd ./{{example_common}} && pnpm dlx expo install expo@latest && pnpm dlx expo install --fix
    cd ./{{example_flashlist}} && pnpm dlx expo install expo@latest && pnpm dlx expo install --fix
    node ./scripts/set-dep.mts ./{{example_flashlist}}/package.json
    cd ./{{example_legendlist}} && pnpm dlx expo install expo@latest && pnpm dlx expo install --fix
    node ./scripts/set-dep.mts ./{{example_legendlist}}/package.json
    cd ./{{example_reanimated}} && pnpm dlx expo install expo@latest && pnpm dlx expo install --fix
    node ./scripts/set-dep.mts ./{{example_reanimated}}/package.json
    just i

# Start common example in development mode
example-common:
    cd ./{{example_common}} && {{dev}}

# Build common example
example-common-build:
    cd ./{{example_common}} && {{build}}

# Start common example in production mode
example-common-start:
    cd ./{{example_common}} && {{start}}

# Start flashlist example in development mode
example-flashlist:
    cd ./{{example_flashlist}} && {{dev}}

# Build flashlist example
example-flashlist-build:
    cd ./{{example_flashlist}} && {{build}}

# Start flashlist example in production mode
example-flashlist-start:
    cd ./{{example_flashlist}} && {{start}}

# Start legendlist example in development mode
example-legendlist:
    cd ./{{example_legendlist}} && {{dev}}

# Build legendlist example
example-legendlist-build:
    cd ./{{example_legendlist}} && {{build}}

# Start legendlist example in production mode
example-legendlist-start:
    cd ./{{example_legendlist}} && {{start}}

# Start reanimated example in development mode
example-reanimated:
    cd ./{{example_reanimated}} && {{dev}}

# Build reanimated example
example-reanimated-build:
    cd ./{{example_reanimated}} && {{build}}

# Start reanimated example in production mode
example-reanimated-start:
    cd ./{{example_reanimated}} && {{start}}

# Add/Remove dev version tag for native package
version-dev-native VERSION="":
    node ./scripts/version-dev.mts ./{{native}}/package.json {{VERSION}}

# Add/Remove dev version tag for flashlist package
version-dev-flashlist VERSION="":
    node ./scripts/version-dev.mts ./{{flashlist}}/package.json {{VERSION}}

# Add/Remove dev version tag for legendlist package
version-dev-legendlist VERSION="":
    node ./scripts/version-dev.mts ./{{legnedlist}}/package.json {{VERSION}}

# Add/Remove dev version tag for reanimated package
version-dev-reanimated VERSION="":
    node ./scripts/version-dev.mts ./{{reanimated}}/package.json {{VERSION}}

# Add/Remove dev version tag
version-dev VERSION="":
    just version-dev-native {{VERSION}}
    just version-dev-flashlist {{VERSION}}
    just version-dev-legendlist {{VERSION}}
    just version-dev-reanimated {{VERSION}}

# Publish react-native package with dev tag as dry-run
publish-dev-try-native:
    cd ./{{native}} && {{publish}} --no-git-checks --tag dev --dry-run

# Publish flashlist package with dev tag as dry-run
publish-dev-try-flashlist:
    cd ./{{flashlist}} && {{publish}} --no-git-checks --tag dev --dry-run

# Publish legendlist package with dev tag as dry-run
publish-dev-try-legendlist:
    cd ./{{legnedlist}} && {{publish}} --no-git-checks --tag dev --dry-run

# Publish reanimated package with dev tag as dry-run
publish-dev-try-reanimated:
    cd ./{{reanimated}} && {{publish}} --no-git-checks --tag dev --dry-run

# Publish all packages with dev tag
publish-dev-try:
    just publish-dev-try-native
    just publish-dev-try-flashlist
    just publish-dev-try-legendlist
    just publish-dev-try-reanimated

# Publish react-native package with dev tag
publish-dev-native:
    cd ./{{native}} && {{publish}} --no-git-checks --tag dev

# Publish flashlist package with dev tag
publish-dev-flashlist:
    cd ./{{flashlist}} && {{publish}} --no-git-checks --tag dev

# Publish legendlist package with dev tag
publish-dev-legendlist:
    cd ./{{legnedlist}} && {{publish}} --no-git-checks --tag dev

# Publish reanimated package with dev tag
publish-dev-reanimated:
    cd ./{{reanimated}} && {{publish}} --no-git-checks --tag dev

# Publish all packages with dev tag
publish-dev:
    just publish-dev-native
    just publish-dev-flashlist
    just publish-dev-legendlist
    just publish-dev-reanimated

# Publish react-native package as dry-run
publish-try-native:
    cd ./{{native}} && {{publish}} --no-git-checks --dry-run

# Publish flashlist package as dry-run
publish-try-flashlist:
    cd ./{{flashlist}} && {{publish}} --no-git-checks --dry-run

# Publish legendlist package as dry-run
publish-try-legendlist:
    cd ./{{legnedlist}} && {{publish}} --no-git-checks --dry-run

# Publish reanimated package as dry-run
publish-try-reanimated:
    cd ./{{reanimated}} && {{publish}} --no-git-checks --dry-run

# Publish all packages as dry-run
publish-try:
    just publish-try-native
    just publish-try-flashlist
    just publish-try-legendlist
    just publish-try-reanimated

# Publish react-native package
publish-native:
    cd ./{{native}} && {{publish}}

# Publish flashlist package
publish-flashlist:
    cd ./{{flashlist}} && {{publish}}

# Publish legendlist package
publish-legendlist:
    cd ./{{legnedlist}} && {{publish}}

# Publish reanimated package
publish-reanimated:
    cd ./{{reanimated}} && {{publish}}

# Publish all packages
publish:
    just publish-native
    just publish-flashlist
    just publish-legendlist
    just publish-reanimated

# Clean builds
clean:
    rm -rf ./examples/*/dist
    rm -rf ./examples/*/.expo
    rm -rf ./examples/*/expo-env.d.ts

    rm -rf ./packages/*/dist

# Clean everything
clean-all:
    just clean

    rm -rf ./examples/*/node_modules

    rm -rf ./packages/*/node_modules

    rm -rf ./node_modules
