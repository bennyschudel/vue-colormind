<template>
  <div id="app">
    <VueColormind
      :value.sync="colors"
    />
    <pre>{{colors}}</pre>
  </div>
</template>

<script>
import VueColormind from './VueColormind';

export default {
  name: 'app',
  data: () => ({
    colors: ['red', 'orange', 'gold', 'chocolate', 'hotpint'],
  }),
  components: {
    VueColormind,
  },
};
</script>

<style lang="scss">
</style>
