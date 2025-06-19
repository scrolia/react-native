[< Back](../README.md)

# Scrolia React Native

This is the documentation for Scrolia React Native.

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

## Usage

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

For more customization:

> `headless` option will remove all the default styles

```tsx
import type * as React from "react";
import type { Options } from "@scrolia/react-native";

import {
    Container,
    ContentX,
    ContentY,
    TrackX,
    ThumbX,
    TrackY,
    ThumbY,
} from "@scrolia/react-native";

type ScrollbarProps = Omit<Options, "headless"> & {
    children?: React.ReactNode;
};

const Scrollbar = (
    props: ScrollbarProps,
): React.JSX.Element => {
    const { children, ...p } = props;

    return (
        <>
            <Container {...p} headless>
                <ContentX>
                    <ContentY>{children}</ContentY>
                </ContentX>
                <TrackX>
                    <ThumbX />
                </TrackX>
                <TrackY>
                    <ThumbY />
                </TrackY>
            </Container>
        </>
    );
}
```

For list of items:

```tsx
import type * as React from "react";
import type { ListRenderItem } from "react-native";
import type { Options } from "@scrolia/react-native";

import {
    Container,
    ListY,
    TrackY,
    ThumbY,
} from "@scrolia/react-native";

type ListProps<T> = Omit<Options, "headless"> & {
    data: ArrayLike<T>;
    renderItem: ListRenderItem<T>;
};

const List = <T,>(
    props: ListProps<T>,
): React.JSX.Element => {
    const { data, renderItem, ...p } = props;

    return (
        <>
            <Container {...p}>
                <ListY
                    data={data}
                    renderItem={renderItem}
                />
                <TrackY>
                    <ThumbY />
                </TrackY>
            </Container>
        </>
    );
}
```

## Extra Components

### `@scrolia/react-native-flash-list`

> This package requires `@shopify/flash-list` to be installed.

List components based on `@shopify/flash-list`:

- `FlashListX`
- `FlashListY`

For more information,
please refer to
[Shopify FlashList](https://shopify.github.io/flash-list/).

### `@scrolia/react-native-reanimated-thumb`

> This package requires `react-native-reanimated` to be installed.

Thumb components based on `react-native-reanimated`:

- `ReanimatedThumbX`
- `ReanimatedThumbY`

For more information,
please refer to
[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/).
