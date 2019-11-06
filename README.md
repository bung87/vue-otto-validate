# vue-otto-validate
[![Build Status](https://travis-ci.org/bung87/vue-otto-validate.svg?branch=master)](https://travis-ci.org/bung87/vue-otto-validate)  [![Total alerts](https://img.shields.io/lgtm/alerts/g/bung87/vue-otto-validate.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bung87/vue-otto-validate/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/bung87/vue-otto-validate.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bung87/vue-otto-validate/context:javascript) [![Npm Version](https://badgen.net/npm/v/vue-otto-validate)](https://www.npmjs.com/package/vue-otto-validate)  ![npm: total downloads](https://badgen.net/npm/dt/vue-otto-validate)![Types](https://badgen.net/npm/types/vue-otto-validate) ![Dep](https://badgen.net/david/dep/bung87/vue-otto-validate) ![license](https://badgen.net/npm/license/vue-otto-validate)

## Install

```sh
$ yarn add vue-otto-validate
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

## dist

```sh
$ yarn dist
```

## start and watch

```sh
$ yarn start
```
