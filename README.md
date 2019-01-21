# <VueColormind />

Vue component for a simple usage of the [colormind.io](http://colormind.io) service.

## Usage

```javascript
import VueColormind from '@hotpink/vue-colormind';

import '@hotpink/vue-colormind/dist/vue-colormind.css';

new Vue({
  name: 'app',
  data: () => ({
    colors: ['hotpink', 'black', 'black', 'black', 'black']
  }),
  template: `<div class="app"> <VueColormind :value.sync="colors" /> </div>`
  components: {
    VueColormind,
  }
}).$mount('#app');
```

## Author
Benny Schudel / Switzerland

## License

[MIT](http://opensource.org/licenses/MIT)


