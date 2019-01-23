<template>
  <div class="vue-colormind"
    @click="emitUpdateActiveIndex()"
  >
    <div class="vue-colormind__model">
      <select
        v-model="model"
      >
        <option
          v-for="(item, index) in models"
          :key="index"
        >{{item}}</option>
      </select>
    </div>
    <div class="vue-colormind__swatches">
      <ColorSwatch
        v-for="(item, index) in colors"
        :key="index"
        :value.sync="item.value"
        :locked.sync="item.locked"
        :active="index === activeIndex"
        @action:move-up="moveUp(index)"
        @action:move-down="moveDown(index)"
        @select="onSwatchSelect(index)"
      />
    </div>
    <div class="vue-colormind__actions">
      <UiButton
        @click="generatePalette"
      ><UiIcon
        icon="sync"
        slot="icon"
      />Generate</UiButton>
    </div>
  </div>
</template>

<script>
import { Color, UiButton, UiIcon } from '@hotpink/vue-mono-ui';

import { clone } from './core/utils';

import { loadPalette, loadAvailableModels } from './services/colormind';

import ColorSwatch from './components/ColorSwatch.vue';

export default {
  name: 'vue-colormind',
  props: {
    value: {
      type: Array,
      default: () => ['#597B7C', '#C2BDA7', '#F4E3BB', '#F4BFB0', '#D78080'],
    },
    activeIndex: {
      type: Number,
    },
  },
  data: () => ({
    colors: [
      {
        value: [0, 0, 0],
        locked: false,
      },
      {
        value: [0, 0, 0],
        locked: false,
      },
      {
        value: [0, 0, 0],
        locked: false,
      },
      {
        value: [0, 0, 0],
        locked: false,
      },
      {
        value: [0, 0, 0],
        locked: false,
      },
    ],
    model: 'default',
    models: [],
  }),
  computed: {
    count() {
      return this.colors.length;
    },
    flatColors() {
      return this.colors.map(d => d.value);
    },
  },
  methods: {
    async loadAvailableModels() {
      const models = await loadAvailableModels();

      this.models = models;
    },
    async generatePalette() {
      let { model, colors } = this;

      colors = colors.map(d => (d.locked ? d.value : null));

      const palette = await loadPalette({
        colors,
        model,
      });

      palette.forEach((v, i) => {
        this.colors[i].value = v;
      });
    },
    moveUp(index) {
      this.changeIndex(index, index - 1);
    },
    moveDown(index) {
      this.changeIndex(index, index + 1);
    },
    changeIndex(index, newPos) {
      let { colors, count } = this;

      const pos =
        newPos < 0 ? newPos + count : newPos >= count ? newPos % count : newPos;
      const item = colors[index];
      colors.splice(index, 1);
      colors.splice(pos, 0, item);
    },
    emitUpdateActiveIndex(index) {
      this.$emit('update:activeIndex', index);
    },
    emitColorSelect(color) {
      this.$emit('color-select', clone(color));
    },
    onSwatchSelect(v) {
      this.emitUpdateActiveIndex(v);
      this.emitColorSelect(this.colors[v]);
    },
    handleValueChange(v) {
      let data = v.map(d => new Color(d));
      data = data.map(color => {
        const { r, g, b } = color.toRgb();

        return [r, g, b];
      });
      data.forEach((rgb, i) => {
        // skip same colors
        if (rgb.join(',') === this.colors[i].value.join(',')) {
          return;
        }

        this.colors[i].value = rgb;
      });
    },
    handleFlatColorsChange(v) {
      let data = v.map(([r, g, b]) => new Color({ r, g, b }));
      data = data.map(color => color.toHexString());

      this.$emit('update:value', data);
    },
  },
  watch: {
    value: 'handleValueChange',
    flatColors: 'handleFlatColorsChange',
  },
  components: {
    ColorSwatch,
    UiButton,
    UiIcon,
  },
  created() {
    this.loadAvailableModels();

    this.handleValueChange(this.value);
  },
};
</script>

<style lang="scss">
.vue-colormind {
  display: inline-flex;
  flex-direction: column;
}

.vue-colormind__swatches {
  display: inline-flex;
  flex-direction: column;
}

.vue-colormind__actions {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 16px;
}
</style>
