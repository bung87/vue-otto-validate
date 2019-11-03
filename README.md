# vue-otto-validate
[![Build Status](https://travis-ci.org/bung87/vue-otto-validate.svg?branch=master)](https://travis-ci.org/bung87/vue-otto-validate)  

## Install

```sh
$ yarn add bung87/vue-otto-validate#v{%= version %}
```
## Usage  
import it , use as plugin , show errors when http response errors.
```js
import Validator,{showErrors} from "vue-otto-validate"
Vue.use(Validator,{className:"text-danger"})
axios.post(...).catch(r => {showErrors( r.response.data.errors)});
// errors object : {fieldName:["message1","message2"...],...}
// if you using rails you already known
```
add directive `v-validate="{leftOffset:100,topOffset:8}"` among with `v-model` to element.  

only need one attribute format as below  
`v-validate:position.className1.className2=optionsObj`  

__notice__: currently only supports `position = "leftTop"`  

preview:

![preview](media/preview.min.png)

results html:

![html](media/html.min.png)
## build

```sh
$ yarn build
```

## start and watch

```sh
$ yarn start
```
