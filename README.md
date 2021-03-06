# global-data

[![npm version](https://img.shields.io/npm/v/@drumtj/global-data.svg?style=flat)](https://www.npmjs.com/package/@drumtj/global-data)
[![license](https://img.shields.io/npm/l/@drumtj/global-data.svg)](#)

data share between class and observe data

## Features

- Make Object from domain string
- Supports Property watching

## Installing

Using npm:

```bash
$ npm install @drumtj/global-data
```

Using cdn:

```html
<script src="https://unpkg.com/@drumtj/global-data@1.0.70/dist/global-data.var.js"></script>
```

Using amd, commonjS Module

```js
const GD = require('@drumtj/global-data');
```

```js
import GD from '@drumtj/global-data';
```

### static methods

```ts
GD.create(domain:String):Object
```
```ts
GD.set(domain:String, value:any):any
```
```ts
GD.get(domain:String):any
```
```ts
GD.watch(domainOrObj:String|Object, watchPropertyName:String, callback:(newValue:any, oldValue:any):void):Object
```
```ts
GD.clear()
```
```ts
GD.clearCallback()
```
```ts
GD.toJSON(domain:String):String
```
```ts
GD.toObject(domain:String):Object
```
```ts
GD.addSomeChangeListener(callback:(obj, key, newValue, oldValue):void)
```
```ts
GD.removeSomeChangeListener(callback)
```

## Example

Creating a data structure

```js
GD.create("editor.stage.options");
// same
//GD.set("editor.stage.options", {});
```

Set data

```js
var timeline = {
  bpm: 120
}
GD.set("editor.timeline", timeline);
```

Get data

```js
GD.get(); //root
GD.get("editor");
GD.get("editor.stage");
```

Watch data

If you pass a domain string as the first argument, it uses the variable set in the domain, and creates a new variable if it does not exist.

```js
// monitoring when setting values
GD.watch("editor.stage.options", 'x', function(newValue, oldValue){
  //something do it
  console.error("x", oldValue, newValue);
})
GD.watch("editor.timeline", "bpm", function(newValue, oldValue){
  //something do it
  console.error("bpm", oldValue, newValue);
})
var editor = GD.get("editor");
editor.stage.options.x = 2;
editor.timeline.bpm = 120;

//same
GD.set("editor.stage.options.x", 2);
GD.set("editor.timeline.bpm", 120);

// you can also use externally declared variables.
var foo = {};
GD.watch(foo, "bar", function(newValue, oldValue){
  console.log("setted bar:", oldValue, newValue);
})
foo.bar = 10; // => output  'setted bar: undefined 10'
```

Clear data and watch callback

```js
GD.clear();
```

Clear only watch callback

```js
GD.clearCallback();
```

add a listener to call when some property changes.

```js
function onChanged(obj, key, newValue, oldValue){
  //
}
GD.addSomeChangeListener(onChanged);

GD.removeSomeChangeListener(onChanged);
```

get json

```js
GD.toJSON("editor.stage");
GD.toJSON("editor.timeline");
GD.toJSON("editor");
```

get clone object

```js
GD.toObject("editor.stage");
GD.toObject("editor.timeline");
GD.toObject("editor");
```

examples ([source](https://github.com/drumtj/global-data/tree/master/examples))
- [property watch](https://drumtj.github.io/global-data/watch.html)
- [property watch2](https://drumtj.github.io/global-data/watch2.html)

## License

MIT
