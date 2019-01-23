<template>
  <div class="color-swatch" :data-locked="locked" :data-active="active">
    <div
      class="color-swatch__body"
      :style="bodyStyles"
      @click.stop="$emit('select')"
    />
    <div class="color-swatch__info">
      <UiColorInput
        :value="color.toHexString()"
        @update:value="onColorInputChange"
      />
      <div class="color-swatch__actions">
        <UiIconButton
          data-name="move-up"
          icon="arrow-up"
          :icon-size="24"
          :padding="0"
          @click="emitAction('move-up')"
        />
        <UiIconButton
          data-name="move-down"
          icon="arrow-down"
          :icon-size="24"
          :padding="0"
          @click="emitAction('move-down')"
        />
        <UiIconButton
          data-name="locked"
          :icon="locked ? 'lock-closed' : 'lock-open'"
          :icon-size="24"
          @click="toggleLocked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Color, UiIconButton, UiColorInput } from '@hotpink/vue-mono-ui';

export default {
  name: 'color-swatch',
  props: {
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 75,
    },
    value: {
      type: Array,
      default: () => [0, 0, 0],
    },
    locked: {
      type: Boolean,
    },
    active: {
      type: Boolean,
    },
  },
  computed: {
    bodyStyles() {
      const { width, height } = this;
      const [r, g, b] = this.value;

      return {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `rgb(${r},${g},${b})`,
      };
    },
    color() {
      const [r, g, b] = this.value;

      return new Color({ r, g, b });
    },
  },
  methods: {
    toggleLocked() {
      this.$emit('update:locked', !this.locked);
    },
    onColorInputChange(v) {
      const { r, g, b } = v.toRgb();

      this.$emit('update:value', [r, g, b]);
    },
    emitAction(action) {
      this.$emit(`action:${action}`);
    },
  },
  components: {
    UiIconButton,
    UiColorInput,
  },
};
</script>

<style lang="scss">
.color-swatch {
  position: relative;
  display: flex;
}

.color-swatch__body {
  margin: 8px;
}

.color-swatch__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 8px;
}

.color-swatch__actions {
  display: flex;
  justify-content: stretch;
  align-items: center;

  .ui-icon-button {
    &[data-name='locked'] {
      margin-left: auto;
    }
  }
}

.color-swatch {
  &[data-active] {
    .color-swatch__body {
      box-shadow: inset 0 0 0 4px hsla(0, 0%, 0%, 0.5);
    }
  }
}
</style>
