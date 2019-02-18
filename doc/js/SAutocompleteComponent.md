# SAutocompleteComponent

Easily create fully customizable autocomplete dropdown

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)

Extends **STemplateComponent**

## Attributes

Here's the list of available attribute(s).

### for

Specify the input to connect the autocomplete to.
This is exactly like the `for` attribute of a `label` tag

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**

### endpoint

Specify the endpoint to use for search and get back autocomplete values

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**

### openOnFocus

Specify if the autocomplete has to open itself on input focus

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**

### inputDebounce

Specify how many times to wait between the user input and the request to the endpoint in ms

Type : **{ Integer }**

Default : **500**

### queryStringParam

Specify the query string search param name

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **q**

### minLengthForSearch

Specify how many characters are needed before trigger a search request on the endpoint

Type : **{ Integer }**

Default : **1**

### autoWidth

Specify if the autocomplete width has to match as best the target input width

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**

### screenMarginTop

Specify the margin in pixels to keep between the select dropdown and the window top corner

Type : **{ Integer }**

Default : **50**

### screenMarginBottom

Specify the margin in pixels to keep between the select dropdown and the window bottom corner

Type : **{ Integer }**

Default : **50**

### dropupLimit

Specify the limit height under which to set the select as a dropup

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **200**

### offset

Specify an offset for the autocomplete. This will add a margin between the autocomplete and the target input

Type : **{ Integer }**

Default : **1**

### onChoose

When a result has been chosen. The chosen result object will be passed as a parameter

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**

### onSearch

When a search query has been made. The query string and the search response will be passed as parameters

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**

## Properties

### results

Store the results of the search json

Type : **{ [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**

Default : **[]**

### selectedResultIdx

Store the selected result idx

Type : **{ Integer }**

Default : **null**

### isOpened

Store the opened state of the autocomplete

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**

### isLoading

Store the loading state of the autocomplete

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**

## Methods

### defaultState

Default state

**Deprecated**

**Static**

### open

Open the autocomplete with an optional keywords value

#### Parameters

| Name     | Type                                                                                                   | Description             | Status   | Default |
| -------- | ------------------------------------------------------------------------------------------------------ | ----------------------- | -------- | ------- |
| keywords | **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }** | Some keywords to search | required |

### close

Close the autocomplete

### isOpened

Check if the autocomplete is opened or not

Return **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }** true if opened, false if not

## Events

### chosen

Event dispatched when an autocomplete result has been chosen.
The result json will be passed to the event under `e.detail`
