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
import type { Options } from "@scrolia/react-native";

import { Scrollbar as S } from "@scrolia/react-native";

type ScrollbarProps = Pick<Options, "disabled"> & {
    children?: React.ReactNode;
};

const Scrollbar = (
    props: ScrollbarProps,
): React.JSX.Element => {
    const { disabled, children } = props;

    return (
        <S.Provider disabled={disabled}>
            <S.Container>
                <S.ContentX>
                    <S.ContentY>{children}</S.ContentY>
                </S.ContentX>
                <S.TrackX>
                    <S.ThumbX />
                </S.TrackX>
                <S.TrackY>
                    <S.ThumbY />
                </S.TrackY>
            </S.Container>
        </S.Provider>
    );
};

export type { ScrollbarProps };
export { Scrollbar };
```

For list of items:

```tsx
import type * as React from "react";
import type { ListRenderItem } from "react-native";
import type { Options } from "@scrolia/react-native";

import { Scrollbar as S } from "@scrolia/react-native";

type ListProps = Pick<Options, "disabled"> & {
    data: ArrayLike<T>;
    renderItem: ListRenderItem<T>;
};

const List = (
    props: ScrollbarProps,
): React.JSX.Element => {
    const { disabled, data, renderItem } = props;

    return (
        <S.Provider disabled={disabled}>
            <S.Container>
                <S.ListY
                    data={data}
                    renderItem={renderItem}
                />
                <S.TrackX>
                    <S.ThumbX />
                </S.TrackX>
                <S.TrackY>
                    <S.ThumbY />
                </S.TrackY>
            </S.Container>
        </S.Provider>
    );
};

export type { ListProps };
export { List };
```

Apply styles to the components using the preferred styling solution:

```tsx
import type * as React from "react";
import type { Options } from "@scrolia/react-native";

import { StyleSheet } from "react-native";
import { Scrollbar as S } from "@scrolia/react-native";

type ScrollbarProps = Pick<Options, "disabled"> & {
    children?: React.ReactNode;
};

const Scrollbar = (p: ScrollbarProps): React.JSX.Element => {
    const { disabled, children } = props;

    return (
        <>
            <S.Provider disabled={disabled}>
                <S.Container style={styles.container}>
                    <S.ContentX>
                        <S.ContentY>{children}</S.ContentY>
                    </S.ContentX>
                    <S.TrackX style={styles.trackX}>
                        <S.ThumbX style={styles.thumbX} />
                    </S.TrackX>
                    <S.TrackY style={styles.trackY}>
                        <S.ThumbY style={styles.thumbY} />
                    </S.TrackY>
                </S.Container>
            </S.Provider>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%",
        width: "100%",
    },
    trackX: {
        zIndex: 1,
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: 12,
    },
    trackY: {
        zIndex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        width: 12,
        height: "100%",
    },
    thumbX: {
        position: "absolute",
        backgroundColor: "#99999955",
        height: 12,
    },
    thumbY: {
        position: "absolute",
        backgroundColor: "#99999955",
        width: 12,
    },
});

export type { ScrollbarProps };
export { Scrollbar };
```

For list of items:

```tsx
import type * as React from "react";
import type { ListRenderItem } from "react-native";
import type { Options } from "@scrolia/react-native";

import { StyleSheet } from "react-native";
import { Scrollbar as S } from "@scrolia/react-native";

type ListProps<T> = Pick<Options, "disabled"> & {
    data: ArrayLike<T>;
    renderItem: ListRenderItem<T>;
};

const List = <T,>(props: ListProps<T>): React.JSX.Element => {
    const { disabled, data, renderItem } = props;

    return (
        <>
            <S.Provider disabled={p.disabled}>
                <S.Container style={styles.container}>
                    <S.ListY
                        data={data}
                        renderItem={renderItem}
                    />
                    <S.TrackY style={styles.trackY}>
                        <S.ThumbY style={styles.thumbY} />
                    </S.TrackY>
                </S.Container>
            </S.Provider>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%",
        width: "100%",
    },
    trackY: {
        zIndex: 1,
        position: "absolute",
        top: 0,
        right: 0,
        width: 12,
        height: "100%",
    },
    thumbY: {
        position: "absolute",
        backgroundColor: "#99999955",
        width: 12,
    },
});

export type { ListProps };
export { List };
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

### `@scrolia/react-native-reanimated`

> This package requires `react-native-reanimated` to be installed.

Components based on `react-native-reanimated`:

- `ReanimatedTrackX`
- `ReanimatedTrackY`
- `ReanimatedThumbX`
- `ReanimatedThumbY`

For more information,
please refer to
[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/).
