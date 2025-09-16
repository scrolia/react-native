[@scrolia/react-native](../README.md) / Scrollbar

# Variable: Scrollbar

```ts
const Scrollbar: object;
```

Defined in: [packages/react-native/src/index.ts:13](https://github.com/scrolia/react-native/blob/1fb46d4d308667f54f560e30294f1e8f8e5e5b84/packages/react-native/src/index.ts#L13)

Scrollbar components.

## Type Declaration

### Container()

```ts
Container: (props) => Element;
```

Container component.

#### Parameters

##### props

[`ContainerProps`](../type-aliases/ContainerProps.md)

#### Returns

`Element`

### ContentX()

```ts
ContentX: (props) => Element;
```

Horizontal Content component.

Use `ListX` for a list of items.

#### Parameters

##### props

[`ContentXProps`](../type-aliases/ContentXProps.md)

#### Returns

`Element`

### ContentY()

```ts
ContentY: (props) => Element;
```

Vertical Content component.

Use `ListY` for a list of items.

#### Parameters

##### props

[`ContentYProps`](../type-aliases/ContentYProps.md)

#### Returns

`Element`

### ListX()

```ts
ListX: <T>(props) => Element;
```

Horizontal list component.

Use `ContentX` for generic content.

#### Type Parameters

##### T

`T`

#### Parameters

##### props

`ListXProps`\<`T`\>

#### Returns

`Element`

### ListY()

```ts
ListY: <T>(props) => Element;
```

Vertical list component.

Use `ContentY` for generic content.

#### Type Parameters

##### T

`T`

#### Parameters

##### props

`ListYProps`\<`T`\>

#### Returns

`Element`

### Provider()

```ts
Provider: (props) => Element;
```

Provider component.

#### Parameters

##### props

###### animated?

`boolean`

Whether use animated tracks and thumbs.

By default, it is `false`.

###### children?

`ReactNode`

###### disabled?

`boolean`

Whether disable the scrollbar.

By default, it is `false`.

###### plugins?

`object`[]

The plugins for the scrollbar.

By default, it is `[]`.

#### Returns

`Element`

### ThumbX()

```ts
ThumbX: (props) => Element;
```

Horizontal thumb component.

#### Parameters

##### props

[`ThumbXProps`](../type-aliases/ThumbXProps.md)

#### Returns

`Element`

### ThumbY()

```ts
ThumbY: (props) => Element;
```

Vertical thumb component.

#### Parameters

##### props

[`ThumbYProps`](../type-aliases/ThumbYProps.md)

#### Returns

`Element`

### TrackX()

```ts
TrackX: (props) => Element;
```

Horizontal track component.

#### Parameters

##### props

[`TrackXProps`](../type-aliases/TrackXProps.md)

#### Returns

`Element`

### TrackY()

```ts
TrackY: (props) => Element;
```

Vertical track component.

#### Parameters

##### props

[`TrackYProps`](../type-aliases/TrackYProps.md)

#### Returns

`Element`
