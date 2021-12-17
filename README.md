# vue-composition-api-proxied

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/bendytree/vue-composition-api-proxied.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/beeman/vue-composition-api-proxied.svg)
![npm](https://img.shields.io/npm/dw/vue-composition-api-proxied.svg)
![npm](https://img.shields.io/npm/dm/vue-composition-api-proxied.svg)
![npm](https://img.shields.io/npm/dy/vue-composition-api-proxied.svg)
![npm](https://img.shields.io/npm/dt/vue-composition-api-proxied.svg)
![NPM](https://img.shields.io/npm/l/vue-composition-api-proxied.svg)
![npm](https://img.shields.io/npm/v/vue-composition-api-proxied.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/bendytree/vue-composition-api-proxied.svg)
![npm collaborators](https://img.shields.io/npm/collaborators/vue-composition-api-proxied.svg)

A `Proxy` based alternative to `reactive` in Vue 2 / [Vue Composition API](https://github.com/vuejs/composition-api).
It makes new properties reactive without the noise of `Vue.set(...)`.

NOTE: This project is **not IE-11 compatible** since it uses [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).
It's for projects stuck on Vue 2 who would like better reactivity.

## Usage

####  Vue 2 & @vue/composition-api

```js
import { reactive } from '@vue/composition-api';
...
setup () {
  const user = reactive({});
  user.name = 'Foo'; // Not reactive! Booo!
  return { user };
},
...
```

#### Using `proxied` instead

```js
import { proxied } from 'vue-composition-api-proxied';
...
setup () {
  const user = proxied({});
  user.name = 'Foo'; // Reactive! Yay!
  return { user };
},
...
```

See tests for details on how it works, but quick tips:

   * Works on objects and arrays
   * Also proxies sub-elements, even if they're added later
   * Does not (yet) work on `Map` or `Set`
   * PRs with test coverage welcome


## MIT License
