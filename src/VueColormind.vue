<template>
  <div class="vue-colormind" @click="emitUpdateActiveIndex()">
    <fieldset :disabled="busy">
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
      <UiField class="vue-colormind__actions" label="Model">
        <UiSelect :value.sync="model" :options="models" />
        <UiButton icon="sync" @click="generatePalette">
          Generate
        </UiButton>
      </UiField>
    </fieldset>
    <transition name="vue-colormind__fade">
      <UiSpinner v-if="busy" absolute />
    </transition>
  </div>
</template>

<script>
import { Color, UiButton, UiSpinner } from '@hotpink/vue-mono-ui';

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
    busy: true,
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
      this.busy = true;
      const models = await loadAvailableModels();

      this.models = models;
      this.busy = false;
    },
    async generatePalette() {
      let { model, colors } = this;

      this.busy = true;
      colors = colors.map(d => (d.locked ? d.value : null));

      const palette = await loadPalette({
        colors,
        model,
      });

      palette.forEach((v, i) => {
        this.colors[i].value = v;
      });
      this.busy = false;
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
      let data = v.map(Color);
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
      let value = v.map(([r, g, b]) => new Color({ r, g, b }));
      value = value.map(color => color.toHexString());

      this.$emit('update:value', value);
    },
  },
  watch: {
    value: 'handleValueChange',
    flatColors: 'handleFlatColorsChange',
  },
  components: {
    ColorSwatch,
    UiButton,
    UiSpinner,
  },
  created() {
    this.loadAvailableModels();

    this.handleValueChange(this.value);
  },
};
</script>

<style lang="scss">
.vue-colormind__fade-enter-active,
.vue-colormind__fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.vue-colormind__fade-enter,
.vue-colormind__fade-leave-to {
  opacity: 0;
}

.vue-colormind {
  position: relative;
  display: inline-flex;
  flex-direction: column;

  > fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }
}

.vue-colormind__swatches {
  display: inline-grid;
  flex-direction: column;
  grid-gap: 16px;
}

.vue-colormind__actions {
  display: flex;
  justify-content: stretch;
  margin-top: 16px;

  .ui-select {
    flex: 1;
  }
}

.vue-colormind__model {
  margin-bottom: 16px;
}
</style>
