# global-data

[![npm version](https://img.shields.io/npm/v/@drumtj/global-data.svg?style=flat)](https://www.npmjs.com/package/@drumtj/global-data)
[![license](https://img.shields.io/npm/l/@drumtj/global-data.svg)](#)

data share between class and data watch

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
<script src="https://unpkg.com/@drumtj/global-data@1.0.52/dist/global-data.var.js"></script>
```

Using amd, commonjS Module

```js
const GD = require('@drumtj/global-data');
```

```js
import GD from '@drumtj/global-data';
```

### Instance methods

##### GD.create(domain:string):object
##### GD.set(domain:string, value:any):any
##### GD.get(domain:string):any
##### GD.watch(domainOrObj:string|object, watchPropertyName:string, callback:(value:any):void):object
##### GD.clear()
##### GD.clearCallback()
##### GD.toJSON(domain:string):string
##### GD.toObject(domain:string):object

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
//watch for setted object
GD.watch("editor.stage.options", 'x', function(value){
  //something do it
})
GD.watch("editor.timeline", "bpm", function(value){
  //something do it
})

//also you can watch any object
var foo = {};
GD.watch(foo, "bar", function(value){
  console.log("setted bar:", value);
})
foo.bar = 10; // => output  'setted bar: 10'
```

Clear data and watch callback

```js
GD.clear();
```

Clear only watch callback

```js
GD.clearCallback();
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


## License

MIT
