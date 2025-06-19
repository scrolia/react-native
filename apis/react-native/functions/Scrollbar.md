[@scrolia/react-native](../README.md) / Scrollbar

# Function: Scrollbar()

```ts
function Scrollbar(props): Element;
```

Defined in: packages/react-native/src/components/scrollbar.tsx:44

Scrollbar component.

### Example

```tsx
import type * as React from "react";

import { View } from "react-native";
import { Scrollbar } from "@scrolia/react-native";

const App = (): React.JSX.Element => {
    return (
        <>
            <View>
                <Scrollbar>
                    <View>Content</View>
                </Scrollbar>
            </View>
        </>
    );
}
```

## Parameters

### props

#### children?

`ReactNode`

#### disabled?

`boolean`

Whether disable the scrollbar.

By default, it is `false`.

#### thumbColor?

\{
  `base?`: `string`;
  `hover?`: `string`;
  `press?`: `string`;
\}

Color of the thumb.

#### thumbColor.base?

`string`

Base color of the thumb.

By default, it is `#99999955`.

#### thumbColor.hover?

`string`

Color of the thumb when hover.

By default, it is `#99999977`.

#### thumbColor.press?

`string`

Color of the thumb when press.

By default, it is `#99999999`.

#### useNativeDriver?

`boolean`

Whether to use native driver for animation.

By default, it is `Platform.OS !== "web"`.

## Returns

`Element`
