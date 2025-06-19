# Scrolia React Native

A customizable scrollbar component.

## Installation

Install this package as a dependency in the project:

```sh
# npm
npm i @scrolia/react-native

# Yarn
yarn add @scrolia/react-native

# pnpm
pnpm add @scrolia/react-native

# Deno
deno add npm:@scrolia/react-native

# Bun
bun add @scrolia/react-native
```

## Quick Start

To create a scrollbar, use the following code:

```tsx
import type * as React from "react";

import { View } from "react-native";

import { Scrollbar } from "@scrolia/react-native";

const Component = (): React.JSX.Element => {
    return (
        <>
            <View>
                <Scrollbar>
                    <View>Content</View>
                </Scrollbar>
            </View>
        </>
    );
};
```

## Documentation

For the documentation, 
please refer to the [Documentation](./docs//README.md).

## APIs

For the APIs,
please refer to the [React Native APIs](./apis/react-native/README.md).

For Flash List package APIs,
please refer to the 
[Flash List APIs](./apis/react-native-flash-list/README.md).

For Reanimated Thumb package APIs,
please refer to the 
[Reanimated Thumb APIs](./apis/react-native-reanimated-thumb/README.md).

## License

This project is licensed under the terms of the MIT license.
