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
