<template>
  <div id="demo">
    <UiWidgetManager>
      <UiWidget title="colormind.io">
        <VueColormind
          :value.sync="colors"
          :active-index.sync="activeIndex"
          @color-select="onColorSelect"
        />
      </UiWidget>
      <UiWidget title="debug">
        <pre
          >{{ activeIndex }}
{{ color }}
{{ colors }}
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
:root {
  --mono-base-rgb: 0, 0, 0;
  --mono-text-rgb: 255, 255, 255;
  --mono-background-rgb: 255, 255, 255;
  --mono-font: Monaco, monospace;

  --ui-spinner__z-index: 9999;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

#demo {
  .ui-widget {
    box-shadow: 8px 8px 0 0 hsla(0, 0%, 0%, 0.3);
  }

  .ui-widget__content {
    background-color: #f8f8f8;
  }
}
</style>
