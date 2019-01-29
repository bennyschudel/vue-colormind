# &lt;VueColormind&gt;

A vue component which creates beautiful color palettes using the [colormind.io](http://colormind.io) service.

## Usage

```javascript
import Vue from 'vue';

import MonoUi from '@hotpin/vue-mono-ui';
import VueColormind from '@hotpink/vue-colormind';

Vue.use(MonoUi);

new Vue({
  name: 'app',
  data: () => ({
    colors: ['hotpink', 'black', 'black', 'black', 'black']
  }),
  template: `<VueColormind :value.sync="colors" />`
  components: {
    VueColormind,
  }
}).$mount('#app');
```

## Author
Benny Schudel / Switzerland

## License

[MIT](http://opensource.org/licenses/MIT)


