[@scrolia/react-native](../README.md) / Scrollbar

# Variable: Scrollbar

```ts
const Scrollbar: object;
```

Defined in: [packages/react-native/src/index.ts:14](https://github.com/scrolia/react-native/blob/32a199aff28c90f3c5768e258e4ffc51efe74c0a/packages/react-native/src/index.ts#L14)

Scrollbar components.

## Type declaration

### Container()

```ts
Container: (props) => Element;
```

Container component.

#### Parameters

##### props

`ContainerProps`

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

`ContentXProps`

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

`ContentYProps`

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

###### onDragEnd?

(`options`) => `void`

The function to be called when the scrollbar is released.

###### onDragMove?

(`options`) => 
  \| `undefined`
  \| \{
  `scrollTo?`: `number`;
\}

The function to be called when the scrollbar is dragged and move.

###### onDragStart?

(`options`) => `void`

The function to be called when the scrollbar is being dragged.

###### onScroll?

(`options`) => 
  \| `undefined`
  \| \{
  `scrollbarOffset?`: `number`;
\}

The function to be called when the scrollbar is being scrolled.

###### onSetLength?

(`options`) => 
  \| `undefined`
  \| \{
  `scrollbarLength?`: `number`;
\}

The function to be called when the length of the scrollbar is being set.

#### Returns

`Element`

### ThumbX()

```ts
ThumbX: (props) => Element;
```

Horizontal thumb component.

#### Parameters

##### props

`ThumbXProps`

#### Returns

`Element`

### ThumbY()

```ts
ThumbY: (props) => Element;
```

Vertical thumb component.

#### Parameters

##### props

`ThumbYProps`

#### Returns

`Element`

### TrackX()

```ts
TrackX: (props) => Element;
```

Horizontal track component.

#### Parameters

##### props

`TrackXProps`

#### Returns

`Element`

### TrackY()

```ts
TrackY: (props) => Element;
```

Vertical track component.

#### Parameters

##### props

`TrackYProps`

#### Returns

`Element`
