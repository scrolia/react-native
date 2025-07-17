## 0.6.0

### Breaking Changes

- Remove default styles
- Remove Original `Scrollbar` component
- Remove all previous options
- All components passed into `Scrollbar` object

### What's New

- React 19 support
- Headless by default
- Add `Provider` component
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

- Update dependencies

## 0.4.0 (2025-04-17)

### Breaking Changes

- Move options:
    - `disabled`
    - `color` => `thumbColor.base`
    - `colorHover` => `thumbColor.hover`
    - `colorActive` => `thumbColor.press`
- Remove options:
    - `position`
    - `containerProps`
    - `contentProps`
    - `trackXProps`
    - `trackYProps`
    - `thumbXProps`
    - `thumbYProps`
- Remove `useDeviceEnvironment` hook

### What's New

- Add components:
    - `Container`
    - `ContentX`
    - `ContentY`
    - `ListX`
    - `ListY`
    - `TrackX`
    - `TrackY`
    - `ThumbX`
    - `ThumbY`
- Add `headless` option
- Add `noAnimation` option
- Add `useNativeDriver` option
- Add `setScrollbarLength` option
- Add `x` object option
- Add `y` object option
- Add sourcemap support

## 0.3.0 (2024-12-18)

### Breaking Changes

- Remove `enable` prop, use `disabled` prop instead
- Rename `colorDrag` to `colorActive`
- Update `useDeviceEnvironment` hook for the new prop

### What's New

- Add `disabled` prop

## 0.2.0 (2024-11-28)

### What's New

- Add support for ES Module
- Add `useDeviceEnvironment` hook
- Add `enable` option

### What's Changed

- Support all environments by default

## 0.1.1 (2024-05-30)

### What's Changed

- Update description

## 0.1.0 (2024-05-30)

First release
