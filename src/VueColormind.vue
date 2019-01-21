<template>
  <div class="vue-colormind">
    <div class="vue-colormind__swatches">
      <ColorSwatch
        v-for="(item, index) in colors"
        :key="item.key"
        :value.sync="item.value"
        :locked.sync="item.locked"
        @action:move-up="moveUp(index)"
        @action:move-down="moveDown(index)"
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
import { loadPalette } from '@/services/colormind';

import Color from './core/Color';

import UiButton from './ui/UiButton';
import UiIcon from './ui/UiIcon';

import ColorSwatch from './components/ColorSwatch';

export default {
  name: 'vue-colormind',
  props: {
    value: {
      type: Array,
      default: () => ['red', 'green', 'gold', 'chocolate', 'hotpint'],
    },
  },
  data: () => ({
    colors: [
      {
        key: 1,
        value: [0, 0, 0],
        locked: false,
      },
      {
        key: 2,
        value: [0, 0, 0],
        locked: false,
      },
      {
        key: 3,
        value: [0, 0, 0],
        locked: false,
      },
      {
        key: 4,
        value: [0, 0, 0],
        locked: false,
      },
      {
        key: 5,
        value: [0, 0, 0],
        locked: false,
      },
    ],
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
    async generatePalette() {
      let { colors } = this;

      colors = colors.map(d => (d.locked ? d.value : null));

      const palette = await loadPalette({ colors });

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
      data = data.map(color => color.toHex());

      this.$emit('update:value', data);
    },
  },
  watch: {
    value: 'handleValueChange',
    flatColors: 'handleFlatColorsChange',
  },
  components: {
    UiButton,
    UiIcon,
    ColorSwatch,
  },
  created() {
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
