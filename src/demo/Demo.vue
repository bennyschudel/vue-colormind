<template>
  <div id="demo">
    <UiWidgetManager>
      <UiWidget
        title="colormind.io"
      >
        <VueColormind
          :value.sync="colors"
          :active-index.sync="activeIndex"
          @color-select="onColorSelect"
        />
      </UiWidget>
      <UiWidget
        title="debug"
      >
        <pre>
{{activeIndex}}
{{color}}
{{colors}}
        </pre>
      </UiWidget>
    </UiWidgetManager>
  </div>
</template>

<script>
import VueColormind from '@/entry';

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
#demo {
  .ui-widget__content {
    padding: 16px;
    border: 1px solid black;
    background-color: white;
  }
}
</style>
