# SAutocompleteComponent

Easily create fully customizable autocomplete dropdown

### Example

```html
<input type="search" name="my-cool-input" placeholder="Keywords..." />
<s-autocomplete for="my-cool-input" endpoint="//api.my-cool-domain.com/search">
  <template>
    <!-- this is a mustache template feeded with each results
   sended back from your api in json format -->
    <span class="something-cool">{{title}}</span>
    <p class="something">{{body}}</p>
  </template>
</s-autocomplete>
```

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

## Mixins

### s-autocomplete-classes

Print out the bare and style component css

#### Parameters

| Name    | Type                | Description            | Status   | Default                   |
| ------- | ------------------- | ---------------------- | -------- | ------------------------- |
| \$color | **{ List<Color> }** | The colors to generate | optional | default primary secondary |

### s-autocomplete-classes-bare

Print out the bare component css

### s-autocomplete-classes-style

Print out the style component css

#### Parameters

| Name    | Type                | Description            | Status   | Default                   |
| ------- | ------------------- | ---------------------- | -------- | ------------------------- |
| \$color | **{ List<Color> }** | The colors to generate | optional | default primary secondary |
