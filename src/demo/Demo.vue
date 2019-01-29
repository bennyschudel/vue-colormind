<template>
  <div id="demo">
    <VueColormind
      :value.sync="colors"
      :active-index.sync="activeIndex"
      @color-select="onColorSelect"
    />
    <pre>
{{activeIndex}}
{{color}}
{{colors}}
    </pre>
  </div>
</template>

<script>
import VueColormind from './entry';

export default {
  name: 'demo',
  data: () => ({
    colors: ['#597B7C', '#C2BDA7', '#F4E3BB', '#F4BFB0', '#D78080'],
    activeIndex: null,
    color: null,
  }),
  methods: {
    onColorSelect(color) {
      this.color = color;
    },
  },
  components: {
    VueColormind,
  },
};
</script>

<style lang="scss">
</style>
