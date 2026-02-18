## 0.6.4

### What's Changed

- support React Native 0.84.0
- upgrade dependencies

## 0.6.3 (2025-12-21)

### What's Changed

- support React Native 0.83.0

## 0.6.2 (2025-10-13)

### What's Changed

- support React Native 0.82.0

## 0.6.1 (2025-08-18)

### What's Changed

- support React Native 0.81.0

## 0.6.0 (2025-08-09)

### Breaking Changes

- remove default styles
- remove Original `Scrollbar` component
- remove all previous options
- all components passed into `Scrollbar` object

### What's New

- React 19 support
- headless by default
- add `Provider` component
- `Provider` component now accepts the following props:
    - `disabled`
    - `page`
    - `plugins`
    - `children`

### Migrating from 0.5.0 to 0.6.0

Import `Scrollbar` instead:

```diff
- import {
-    Container,
-    ContentX,
-    ContentY,
-    TrackX,
-    TrackY,
-    ThumbX,
-    ThumbY,
- } from "@scrolia/react-native";
+ import { Scrollbar as S } from "@scrolia/react-native";
```

`Provider` component required:

```diff
- <Container>
-     <Content>{/* */}</Content>
-     <TrackX>
-         <ThumbX />
-     </TrackX>
-     <TrackY>
-         <ThumbY />
-     </TrackY>
- </Container>
+ <S.Provider>
+     <S.Container>
+         <S.ContentX>
+             <S.ContentY>{/* */}</S.ContentY>
+         </S.ContentX>
+         <S.TrackX>
+             <S.ThumbX />
+         </S.TrackX>
+         <S.TrackY>
+             <S.ThumbY />
+         </S.TrackY>
+ </S.Provider>
```

## 0.5.0 (2025-06-20)

### What's Changed

- upgrade dependencies

## 0.4.0 (2025-04-17)

### Breaking Changes

- move options:
    - `disabled`
    - `color` => `thumbColor.base`
    - `colorHover` => `thumbColor.hover`
    - `colorActive` => `thumbColor.press`
- remove options:
    - `position`
    - `containerProps`
    - `contentProps`
    - `trackXProps`
    - `trackYProps`
    - `thumbXProps`
    - `thumbYProps`
- remove `useDeviceEnvironment` hook

### What's New

- add components:
    - `Container`
    - `ContentX`
    - `ContentY`
    - `ListX`
    - `ListY`
    - `TrackX`
    - `TrackY`
    - `ThumbX`
    - `ThumbY`
- add `headless` option
- add `noAnimation` option
- add `useNativeDriver` option
- add `setScrollbarLength` option
- add `x` object option
- add `y` object option
- add sourcemap support

## 0.3.0 (2024-12-18)

### Breaking Changes

- remove `enable` prop, use `disabled` prop instead
- rename `colorDrag` to `colorActive`
- update `useDeviceEnvironment` hook for the new prop

### What's New

- add `disabled` prop

## 0.2.0 (2024-11-28)

### What's New

- add support for ES Module
- add `useDeviceEnvironment` hook
- add `enable` option

### What's Changed

- support all environments by default

## 0.1.1 (2024-05-30)

### What's Changed

- update description

## 0.1.0 (2024-05-30)

initial release
